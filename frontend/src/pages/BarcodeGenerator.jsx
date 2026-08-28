import React, { useState, useRef, useEffect } from 'react';
import { 
  Barcode as BarcodeIcon, 
  Printer, 
  Download, 
  RefreshCw, 
  Grid,
  Square,
  CheckCircle2,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { 
  SUPPORTED_SYMBOLOGIES, 
  drawUniversalBarcode 
} from '../utils/barcode';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function BarcodeGenerator() {
  const { activeCurrency } = useCurrency();

  // Symbology & Data States
  const [symbology, setSymbology] = useState('CODE128');
  const [dataText, setDataText] = useState('SKU-ELITE-2026');
  const [productTitle, setProductTitle] = useState('Organic Cotton T-Shirt (M)');
  const [productPrice, setProductPrice] = useState(24.99);

  // Styling & Customization States
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(70);
  const [showHumanText, setShowHumanText] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [labelQuantity, setLabelQuantity] = useState(30);
  const [viewMode, setViewMode] = useState('sheet'); // Default to 30-Up Sheet

  // Master Canvas Ref & Barcode Image Data URL State
  const masterCanvasRef = useRef(null);
  const [barcodeDataUrl, setBarcodeDataUrl] = useState('');

  const activeSymbology = SUPPORTED_SYMBOLOGIES.find(s => s.id === symbology) || SUPPORTED_SYMBOLOGIES[0];

  const handleSymbologyChange = (newSymbology) => {
    setSymbology(newSymbology);
    const found = SUPPORTED_SYMBOLOGIES.find(s => s.id === newSymbology);
    if (found) {
      setDataText(found.sample);
    }
  };

  // Render Barcode whenever parameters change
  useEffect(() => {
    let isMounted = true;
    if (masterCanvasRef.current && dataText) {
      drawUniversalBarcode(masterCanvasRef.current, dataText, symbology, {
        barWidth,
        barHeight,
        showText: showHumanText,
        color: '#000000',
        background: '#FFFFFF'
      }).then(() => {
        if (isMounted && masterCanvasRef.current) {
          try {
            const url = masterCanvasRef.current.toDataURL('image/png');
            setBarcodeDataUrl(url);
          } catch (e) {
            console.error("Failed to generate data URL", e);
          }
        }
      });
    }
    return () => { isMounted = false; };
  }, [symbology, dataText, barWidth, barHeight, showHumanText]);

  // Handle Download Single PNG
  const handleDownloadSinglePNG = () => {
    if (!barcodeDataUrl) return;
    const link = document.createElement('a');
    link.download = `barcode-${symbology}-${dataText}.png`;
    link.href = barcodeDataUrl;
    link.click();
  };

  // Handle Download 30-Up Sheet PNG (High-Res 300 DPI Letter)
  const handleDownloadSheetPNG = () => {
    if (!barcodeDataUrl) return;

    // 300 DPI Letter Sheet: 8.5" x 11" = 2550px x 3300px
    const sheetCanvas = document.createElement('canvas');
    sheetCanvas.width = 2550;
    sheetCanvas.height = 3300;
    const ctx = sheetCanvas.getContext('2d');

    // Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

    // Avery 5160 300 DPI Pixel Layout:
    // Left Margin: 0.1875" = 56.25px
    // Top Margin: 0.5" = 150px
    // Label Width: 2.625" = 787.5px
    // Label Height: 1.0" = 300px
    // Col Gap: 0.125" = 37.5px
    const leftMargin = 56.25;
    const topMargin = 150;
    const labelWidth = 787.5;
    const labelHeight = 300;
    const colGap = 37.5;
    const rowGap = 0;

    const barcodeImg = new Image();
    barcodeImg.crossOrigin = 'anonymous';
    barcodeImg.onload = () => {
      const count = Math.min(Math.max(1, labelQuantity), 30);
      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = leftMargin + col * (labelWidth + colGap);
        const y = topMargin + row * (labelHeight + rowGap);

        // Draw Label Outline if enabled
        if (showOutline) {
          ctx.strokeStyle = '#D1D5DB';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 8]);
          ctx.strokeRect(x, y, labelWidth, labelHeight);
          ctx.setLineDash([]);
        }

        // Draw Product Title
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        const titleText = productTitle.length > 32 ? productTitle.slice(0, 30) + '...' : productTitle;
        ctx.fillText(titleText, x + labelWidth / 2, y + 40);

        // Draw Barcode Image
        const imgAspect = barcodeImg.width / barcodeImg.height;
        const targetImgHeight = 175;
        const targetImgWidth = Math.min(labelWidth - 40, targetImgHeight * imgAspect);
        const imgX = x + (labelWidth - targetImgWidth) / 2;
        const imgY = y + 48;

        ctx.drawImage(barcodeImg, imgX, imgY, targetImgWidth, targetImgHeight);

        // Draw Product Price (Bottom Right)
        ctx.fillStyle = '#4F46E5';
        ctx.font = 'bold 28px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${activeCurrency.symbol}${productPrice.toFixed(2)}`, x + labelWidth - 24, y + labelHeight - 18);
      }

      // Trigger Download
      const link = document.createElement('a');
      link.download = `avery-5160-sheet-${dataText}.png`;
      link.href = sheetCanvas.toDataURL('image/png');
      link.click();
    };
    barcodeImg.src = barcodeDataUrl;
  };

  // Trigger Print Dialog
  const handlePrintSheet = () => {
    if (viewMode !== 'sheet') {
      setViewMode('sheet');
    }
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const faqs = [
    {
      question: "What is the difference between Code 128, UPC-A, and EAN-13 barcodes?",
      answer: "Code 128 is a highly compact, variable-length alphanumeric symbology used for Amazon FNSKU labels, internal inventory tracking, and shipping logistics. UPC-A is a 12-digit numeric barcode standard used primarily for retail products in North America. EAN-13 is a 13-digit numeric barcode standard used internationally for retail product packaging worldwide."
    },
    {
      question: "What is an Amazon FNSKU barcode and how do I print it?",
      answer: "An FNSKU (Fulfillment Network Stock Keeping Unit) is Amazon's unique identifier for FBA products. FNSKU barcodes are encoded using the Code 128 format (e.g. starting with X00...). You can print FNSKU labels using our 30-up label generator formatted for standard Avery 5160 label sheets."
    },
    {
      question: "Can I print barcode labels on standard Avery 5160 30-up label sheets?",
      answer: "Yes! Switch the generator view mode to 'Printable 30-Up Sheet'. This formats your barcode, product title, and price into standard 1\" x 2-5/8\" label dimensions matching Avery 5160, 5260, and 8160 30-per-page label sheets."
    },
    {
      question: "What bar width and height settings ensure clean warehouse scanning?",
      answer: "Maintain a bar width setting of at least 2px (or 10-12 mil in thermal printing) and a minimum height of 50px to 70px. Ensure sufficient 'quiet zone' whitespace margins on the left and right sides of the barcode bars to prevent laser scanner errors."
    },
    {
      question: "Why is my generated barcode not scanning properly on my scanner or phone?",
      answer: "Scanning failures are usually caused by insufficient color contrast (bars must be dark on a light background), distorted aspect ratio scaling, low printer DPI resolution, or entering invalid characters for fixed-length symbologies like UPC-A (12 digits) or EAN-13 (13 digits)."
    },
    {
      question: "Do I need a GS1 subscription to generate barcodes with this tool?",
      answer: "Our tool generates valid industrial barcode graphics for internal inventory, Amazon FNSKU labeling, shipping packages, and private tracking. However, if you plan to sell products in major retail stores (Target, Walmart), you must purchase official registered GTIN/UPC prefixes directly from GS1."
    }
  ];

  return (
    <>
      {/* Dynamic Embedded Print CSS Styles for Perfect Avery 5160 Page Alignment */}
      <style>{`
        @media print {
          header, footer, nav, .no-print, .non-printable {
            display: none !important;
          }
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          @page {
            size: letter portrait;
            margin: 0.5in 0.1875in;
          }
          .avery-5160-print-root {
            display: block !important;
            width: 8.125in !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }
          .avery-5160-grid-print {
            display: grid !important;
            grid-template-columns: repeat(3, 2.625in) !important;
            grid-template-rows: repeat(10, 1.0in) !important;
            column-gap: 0.125in !important;
            row-gap: 0in !important;
            width: 8.125in !important;
            margin: 0 !important;
          }
          .avery-label-print-cell {
            width: 2.625in !important;
            height: 1.0in !important;
            padding: 0.04in 0.08in !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: space-between !important;
            overflow: hidden !important;
            border: ${showOutline ? '1px dashed #d1d5db' : 'none'} !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .avery-label-print-cell img {
            max-height: 0.54in !important;
            max-width: 2.45in !important;
            object-fit: contain !important;
          }
        }
      `}</style>

      {/* Hidden Master Render Canvas (Always Active) */}
      <canvas ref={masterCanvasRef} className="hidden" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 no-print">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
            <BarcodeIcon className="w-3.5 h-3.5" />
            <span>Industrial Barcode & 30-Up Label Sheet Studio</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Free Barcode & <span className="text-brand-600 dark:text-brand-400">Label Sheet Generator</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Generate Code 128, EAN-13, UPC-A, Code 39, and QR codes. Export high-res PNG graphics or print standard 30-up Avery 5160 label sheets.
          </p>
        </div>

        {/* View Mode Toggle Banner */}
        <div className="flex justify-center mb-8 no-print">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 inline-flex gap-1">
            <button
              onClick={() => setViewMode('single')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'single'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Single Barcode Studio</span>
            </button>
            <button
              onClick={() => setViewMode('sheet')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'sheet'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Printable 30-Up Sheet (Avery 5160)</span>
            </button>
          </div>
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 no-print">
          
          {/* Generator Controls Sidebar */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Barcode Symbology & Parameters
              </h2>
              <button
                onClick={() => {
                  setSymbology('CODE128');
                  setDataText('SKU-ELITE-2026');
                  setProductTitle('Organic Cotton T-Shirt (M)');
                  setProductPrice(24.99);
                  setBarWidth(2);
                  setBarHeight(70);
                  setShowHumanText(true);
                  setLabelQuantity(30);
                  setShowOutline(true);
                }}
                className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Barcode Symbology
                </label>
                <select
                  value={symbology}
                  onChange={(e) => handleSymbologyChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                >
                  {SUPPORTED_SYMBOLOGIES.map(s => (
                    <option key={s.id} value={s.id} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">
                      {s.name} - ({s.description})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="bc-data-text" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Barcode Encoded Data String
                </label>
                <input
                  id="bc-data-text"
                  aria-label="Barcode Encoded Data String"
                  type="text"
                  value={dataText}
                  onChange={(e) => setDataText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Format rule: {activeSymbology.rule}
                </span>
              </div>

              <div>
                <label htmlFor="bc-product-title" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Product Title (For Printed Label)
                </label>
                <input
                  id="bc-product-title"
                  aria-label="Product Title for Printed Label"
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label htmlFor="bc-product-price" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                  Product Price ({activeCurrency.symbol})
                </label>
                <input
                  id="bc-product-price"
                  aria-label={`Product Price in ${activeCurrency.symbol}`}
                  type="number"
                  step="0.01"
                  value={productPrice || ''}
                  onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label htmlFor="bc-bar-height" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Bar Height: {barHeight}px
                  </label>
                  <input
                    id="bc-bar-height"
                    aria-label="Bar Height in pixels"
                    type="range"
                    min="40"
                    max="120"
                    value={barHeight}
                    onChange={(e) => setBarHeight(parseInt(e.target.value, 10))}
                    className="w-full accent-brand-600"
                  />
                </div>

                <div>
                  <label htmlFor="bc-bar-width" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Bar Width: {barWidth}px
                  </label>
                  <input
                    id="bc-bar-width"
                    aria-label="Bar Width in pixels"
                    type="range"
                    min="1"
                    max="4"
                    value={barWidth}
                    onChange={(e) => setBarWidth(parseInt(e.target.value, 10))}
                    className="w-full accent-brand-600"
                  />
                </div>
              </div>

              {viewMode === 'sheet' && (
                <div className="pt-1">
                  <label htmlFor="bc-label-qty" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Labels Per Sheet: {labelQuantity} (Max 30)
                  </label>
                  <input
                    id="bc-label-qty"
                    aria-label="Labels per sheet quantity"
                    type="range"
                    min="1"
                    max="30"
                    value={labelQuantity}
                    onChange={(e) => setLabelQuantity(parseInt(e.target.value, 10))}
                    className="w-full accent-brand-600"
                  />
                </div>
              )}

              <div className="space-y-2 pt-1">
                <label htmlFor="bc-show-human-text" className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    id="bc-show-human-text"
                    aria-label="Include Human-Readable Text Below Bars"
                    type="checkbox"
                    checked={showHumanText}
                    onChange={(e) => setShowHumanText(e.target.checked)}
                    className="rounded text-brand-600"
                  />
                  <span>Include Human-Readable Text Below Bars</span>
                </label>

                {viewMode === 'sheet' && (
                  <label htmlFor="bc-show-outline" className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      id="bc-show-outline"
                      aria-label="Show Dashed Grid Outline"
                      type="checkbox"
                      checked={showOutline}
                      onChange={(e) => setShowOutline(e.target.checked)}
                      className="rounded text-brand-600"
                    />
                    <span>Show Dashed Grid Outline (Alignment Check)</span>
                  </label>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-3">
              {viewMode === 'single' ? (
                <button
                  onClick={handleDownloadSinglePNG}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Barcode PNG</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleDownloadSheetPNG}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/20"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Download Sheet PNG</span>
                  </button>

                  <button
                    onClick={handlePrintSheet}
                    className="flex-1 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-brand-600/20"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print 30-Up Sheet</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Live Preview Studio Box */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a12] p-6 sm:p-8 flex flex-col items-center justify-center min-h-[460px]">
            {viewMode === 'single' ? (
              <div className="p-8 rounded-2xl bg-white text-slate-900 border border-slate-300 shadow-2xl text-center space-y-4 max-w-md w-full">
                <span className="text-xs font-bold block uppercase tracking-wider text-slate-600">
                  {productTitle}
                </span>
                <div className="flex justify-center my-2 min-h-[100px] items-center">
                  {barcodeDataUrl ? (
                    <img src={barcodeDataUrl} alt="Barcode Preview" className="max-w-full h-auto" />
                  ) : (
                    <span className="text-xs text-slate-400">Rendering barcode...</span>
                  )}
                </div>
                <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                  <span className="font-mono text-sm font-extrabold text-brand-600">
                    {activeCurrency.symbol}{productPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-900 dark:text-brand-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Avery 5160 Printable 30-Up Layout Preview</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleDownloadSheetPNG}
                      className="font-bold underline text-emerald-600 dark:text-emerald-400 hover:text-emerald-500"
                    >
                      Download PNG
                    </button>
                    <button 
                      onClick={handlePrintSheet}
                      className="font-bold underline text-brand-600 dark:text-brand-400 hover:text-brand-500 flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Now</span>
                    </button>
                  </div>
                </div>

                {/* 30-Up Sheet Interactive Screen Preview */}
                <div className="p-4 bg-white text-slate-900 rounded-xl border border-slate-300 shadow-xl overflow-x-auto">
                  <div className="grid grid-cols-3 gap-2 min-w-[520px]">
                    {Array.from({ length: Math.min(Math.max(1, labelQuantity), 30) }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`p-2.5 rounded text-center text-[10px] flex flex-col items-center justify-between bg-white min-h-[106px] ${
                          showOutline ? 'border border-dashed border-slate-300' : 'border border-slate-100'
                        }`}
                      >
                        <span className="truncate font-bold text-slate-900 w-full block text-[10px] leading-snug pt-0.5">
                          {productTitle}
                        </span>
                        <div className="flex-1 flex items-center justify-center my-1 max-w-full">
                          {barcodeDataUrl ? (
                            <img src={barcodeDataUrl} alt="Barcode" className="max-h-[48px] max-w-full object-contain" />
                          ) : (
                            <span className="font-mono text-[9px] text-slate-400">Barcode</span>
                          )}
                        </div>
                        <div className="w-full flex items-center justify-end pt-0.5">
                          <span className="font-mono font-bold text-brand-600 text-[10px]">
                            {activeCurrency.symbol}{productPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Author Bio & E-E-A-T Component */}
        <AuthorBio 
          authorName="SellerKit Supply Chain & Barcode Engineering Team"
          authorRole="Retail Logistics & GS1 Barcode Standards Specialists"
          lastUpdated="2026 Barcode Symbology Specifications Verified"
          category="Labeling & Barcode Engineering"
        />

        {/* Recommended Seller Tools Affiliate Component */}
        <AffiliateCTA 
          platform="amazon" 
          title="Recommended Thermal Printers & FBA Label Hardware" 
          description="Print Amazon FNSKU barcodes and shipping labels with direct thermal printers."
        />

        {/* Barcode Symbology Specification Reference Table */}
        <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm no-print">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Industrial Barcode Symbology Specification Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Technical specifications for standard 1D linear barcodes and 2D matrix QR codes.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                  <th className="p-3">Symbology</th>
                  <th className="p-3">Character Set</th>
                  <th className="p-3">Length Rule</th>
                  <th className="p-3">Primary E-Commerce Use Case</th>
                  <th className="p-3">Scanner Compatibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Code 128</td>
                  <td className="p-3 font-mono text-brand-600 dark:text-brand-400">Full ASCII 128</td>
                  <td className="p-3">Variable length</td>
                  <td className="p-3 font-bold text-emerald-600">Amazon FNSKU & Warehouse Shipping</td>
                  <td className="p-3">100% Universal 1D / 2D Scanners</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">UPC-A</td>
                  <td className="p-3 font-mono">Numeric (0-9)</td>
                  <td className="p-3 font-mono">Exact 12 Digits</td>
                  <td className="p-3">North American Retail POS Packaging</td>
                  <td className="p-3">Universal Retail Laser Scanners</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">EAN-13</td>
                  <td className="p-3 font-mono">Numeric (0-9)</td>
                  <td className="p-3 font-mono">Exact 13 Digits</td>
                  <td className="p-3">Global International Retail Products</td>
                  <td className="p-3">Universal Retail Laser Scanners</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Code 39</td>
                  <td className="p-3 font-mono">Alphanumeric Caps</td>
                  <td className="p-3">Variable length</td>
                  <td className="p-3">Industrial Logistics & Automotive</td>
                  <td className="p-3">Universal 1D Scanners</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">QR Code</td>
                  <td className="p-3 font-mono text-emerald-600">Binary / UTF-8 / URL</td>
                  <td className="p-3">Up to 7,089 chars</td>
                  <td className="p-3">Website Links & Digital Manuals</td>
                  <td className="p-3">Smartphone Cameras & 2D Image Scanners</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Structured FAQ Section */}
        <div className="no-print">
          {/* Cross-Tool Navigation Component */}
          <RelatedTools currentPath="/tools/barcode-generator" />

          {/* Structured FAQ Section */}
          <FAQSection title="Free Barcode Generator FAQs" faqs={faqs} />
        </div>
      </div>

      {/* Dedicated Print-Only Avery 5160 Sheet Structure (Visible ONLY during window.print()) */}
      <div className="hidden avery-5160-print-root">
        <div className="avery-5160-grid-print">
          {Array.from({ length: Math.min(Math.max(1, labelQuantity), 30) }).map((_, i) => (
            <div key={i} className="avery-label-print-cell">
              <span className="font-bold text-[9px] text-slate-900 truncate w-full text-center leading-tight">
                {productTitle}
              </span>
              {barcodeDataUrl && (
                <img src={barcodeDataUrl} alt="Barcode" className="my-0.5 max-h-[0.52in] object-contain" />
              )}
              <div className="w-full flex items-center justify-end text-[8px] pt-0.5">
                <span className="font-mono font-bold text-indigo-700">
                  {activeCurrency.symbol}{productPrice.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
