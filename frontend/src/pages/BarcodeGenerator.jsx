import React, { useState, useRef, useEffect } from 'react';
import { 
  Barcode as BarcodeIcon, 
  Printer, 
  Download, 
  RefreshCw, 
  Sparkles, 
  QrCode, 
  Layers, 
  Check, 
  Palette, 
  HelpCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { 
  SUPPORTED_SYMBOLOGIES, 
  drawUniversalBarcode 
} from '../utils/barcode';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function BarcodeGenerator() {
  const { activeCurrency, format } = useCurrency();

  // Symbology & Data States
  const [symbology, setSymbology] = useState('CODE128');
  const [dataText, setDataText] = useState('SKU-ELITE-2026');
  const [productTitle, setProductTitle] = useState('Organic Cotton T-Shirt (M)');
  const [productPrice, setProductPrice] = useState(24.99);

  // Styling & Customization States
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(70);
  const [showHumanText, setShowHumanText] = useState(true);
  const [barColor, setBarColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [labelQuantity, setLabelQuantity] = useState(12); // for printable sheet
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'sheet'

  const singleCanvasRef = useRef(null);

  // Active symbology details
  const activeSymbology = SUPPORTED_SYMBOLOGIES.find(s => s.id === symbology) || SUPPORTED_SYMBOLOGIES[0];

  // Auto-fill valid sample on symbology switch
  const handleSymbologyChange = (newSymbology) => {
    setSymbology(newSymbology);
    const found = SUPPORTED_SYMBOLOGIES.find(s => s.id === newSymbology);
    if (found) {
      setDataText(found.sample);
    }
  };

  // Draw Single Barcode whenever parameters change
  useEffect(() => {
    if (viewMode === 'single' && singleCanvasRef.current && dataText) {
      drawUniversalBarcode(singleCanvasRef.current, dataText, symbology, {
        barWidth: parseInt(barWidth, 10) || 2,
        height: parseInt(barHeight, 10) || 70,
        color: barColor,
        background: bgColor,
        showText: showHumanText
      });
    }
  }, [dataText, symbology, barWidth, barHeight, showHumanText, barColor, bgColor, viewMode]);

  const handleDownloadPNG = () => {
    if (!singleCanvasRef.current) return;
    const link = document.createElement('a');
    link.download = `${dataText}-${symbology.toLowerCase()}.png`;
    link.href = singleCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const generateRandomCode = () => {
    if (symbology === 'EAN13') {
      const random12 = Math.floor(100000000000 + Math.random() * 900000000000).toString();
      setDataText(random12);
    } else if (symbology === 'UPC') {
      const random11 = '0' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setDataText(random11);
    } else if (symbology === 'EAN8') {
      const random7 = Math.floor(1000000 + Math.random() * 9000000).toString();
      setDataText(random7);
    } else if (symbology === 'ITF14') {
      const random13 = '1' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
      setDataText(random13);
    } else if (symbology === 'codabar') {
      const randomNum = Math.floor(10000000 + Math.random() * 90000000);
      setDataText(`A${randomNum}B`);
    } else if (symbology === 'qrcode') {
      setDataText(`https://sellerkit.tools/p/${Math.floor(10000 + Math.random() * 90000)}`);
    } else {
      const prefixes = ['PROD', 'SKU', 'FBA', 'ITEM', 'CARTON'];
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const num = Math.floor(100000 + Math.random() * 900000);
      setDataText(`${p}-${num}`);
    }
  };

  const faqs = [
    {
      question: "Why did Codabar (A12345678B) drop the 'A' and 'B' when scanned?",
      answer: "In the official Codabar specification (ANSI/AIM BC3), the letters 'A', 'B', 'C', and 'D' are designated as Start and Stop framing characters. Handheld laser scanners and mobile apps use them solely to detect the orientation of the barcode and deliberately strip them from the decoded result, outputting only the numeric payload (12345678). If you need letters like A and B to be scanned as part of your SKU, use Code 128 or Code 39."
    },
    {
      question: "Which barcode format should I use for general e-commerce SKUs?",
      answer: "For e-commerce items, Amazon FBA FNSKUs, and Shopify inventory, always use Code 128. It supports all uppercase and lowercase letters, numbers, hyphens, and symbols, and every letter will be fully scanned."
    },
    {
      question: "Can these QR codes be scanned directly with smartphone cameras?",
      answer: "Yes! Our QR code generator follows the official ISO/IEC 18004 specification with Reed-Solomon error correction. Any modern iPhone Camera, Android Camera, or Google Lens can scan it instantly."
    },
    {
      question: "What is the difference between UPC-A and EAN-13?",
      answer: "UPC-A (12 digits) is standard in North America (USA & Canada). EAN-13 (13 digits) is standard globally across Europe, Asia, and Latin America. Standard retail checkout POS scanners support both."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Universal Multi-Symbology Barcode Studio (ISO & AIM Compliant)</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Free <span className="text-brand-600 dark:text-brand-400">Barcode & 2D QR</span> Generator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          Create 100% scan-tested 1D barcodes (Code 128, EAN-13, UPC-A, Code 39, ITF-14, Codabar) and mobile-scannable 2D QR codes with instant A4 sticker sheet printing.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex p-1 rounded-xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10">
          <button
            onClick={() => setViewMode('single')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${
              viewMode === 'single'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Single Barcode Studio
          </button>
          <button
            onClick={() => setViewMode('sheet')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition ${
              viewMode === 'sheet'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Printable Sticker Sheet ({labelQuantity} Labels)
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs & Options Panel (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl no-print">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Symbology & Content
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose format and customize appearance
              </p>
            </div>
            <button
              onClick={generateRandomCode}
              className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline transition"
              title="Generate valid sample data for active format"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sample Data</span>
            </button>
          </div>

          {/* Symbology Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Barcode Symbology / Format
            </label>
            <select
              value={symbology}
              onChange={(e) => handleSymbologyChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-brand-500"
            >
              <optgroup label="📦 E-Commerce & Retail 1D">
                <option value="CODE128">Code 128 (Universal / Amazon FNSKU / SKU) [Recommended]</option>
                <option value="EAN13">EAN-13 (International Retail - 13 Digits)</option>
                <option value="UPC">UPC-A (US/North America Retail - 12 Digits)</option>
                <option value="EAN8">EAN-8 (Compact Retail - 8 Digits)</option>
              </optgroup>
              <optgroup label="🚚 Logistics & Warehousing">
                <option value="ITF14">ITF-14 / Interleaved 2 of 5 (Master Cartons)</option>
                <option value="CODE39">Code 39 (Industrial / Defense / Alphanumeric)</option>
                <option value="codabar">Codabar / NW-7 (Libraries & Medical Labs)</option>
              </optgroup>
              <optgroup label="📱 2D Matrix Codes">
                <option value="qrcode">QR Code (2D ISO/IEC 18004 Standard URL & Text)</option>
              </optgroup>
            </select>
          </div>

          {/* Symbology Explanatory / Warning Banner */}
          {symbology === 'codabar' && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400">
                <Info className="w-4 h-4" />
                <span>Codabar Start/Stop Character Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                In Codabar, letters like <strong>A</strong> and <strong>B</strong> act as start/stop framing characters. Scanners deliberately strip them and output only the digits (e.g. <code>12345678</code>). To scan full alphanumeric text including letters, select <strong>Code 128</strong>.
              </p>
            </div>
          )}

          {symbology === 'qrcode' && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400">
                <Check className="w-4 h-4" />
                <span>ISO/IEC 18004 Smartphone Scannable</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                Full Reed-Solomon error correction enabled. Instantly opens links when scanned with iPhone Camera, Google Lens, or Android scanners.
              </p>
            </div>
          )}

          {/* Barcode Content Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {symbology === 'qrcode' ? 'URL or Text to Encode:' : 'Data / SKU / Number to Encode:'}
              </label>
              <span className="text-[10px] text-brand-600 dark:text-brand-400 font-mono">
                {activeSymbology.category}
              </span>
            </div>
            <input
              type="text"
              value={dataText}
              onChange={(e) => setDataText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500 font-bold tracking-wider"
              placeholder={symbology === 'qrcode' ? 'https://example.com' : 'Enter SKU or Code'}
            />
            <p className="text-[11px] text-slate-500 mt-1">
              {activeSymbology.description}
            </p>
          </div>

          {/* Product Label Title & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Product Title (Label)
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                placeholder="Product Name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Price Display ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={productPrice || ''}
                onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Dimensions & Sizing */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                {symbology === 'qrcode' ? 'QR Module Density' : 'Bar Width (Module)'}
              </label>
              <select
                value={barWidth}
                onChange={(e) => setBarWidth(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="1">1px (Compact)</option>
                <option value="2">2px (Standard - Recommended)</option>
                <option value="3">3px (Dense/High-Res)</option>
                <option value="4">4px (Large Master Carton)</option>
              </select>
            </div>

            {symbology !== 'qrcode' ? (
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Bar Height (px)</label>
                <select
                  value={barHeight}
                  onChange={(e) => setBarHeight(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="45">45px (Compact Sticker)</option>
                  <option value="70">70px (Standard)</option>
                  <option value="100">100px (Tall Logistics)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Sheet Labels</label>
                <select
                  value={labelQuantity}
                  onChange={(e) => setLabelQuantity(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="6">6 Labels (Large)</option>
                  <option value="12">12 Labels (Standard)</option>
                  <option value="24">24 Labels (Dense A4)</option>
                </select>
              </div>
            )}
          </div>

          {/* Color & Visibility Options */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHumanText}
                  onChange={(e) => setShowHumanText(e.target.checked)}
                  className="rounded text-brand-600"
                />
                <span>Show Human-Readable Text Below</span>
              </label>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Color:</span>
                <input
                  type="color"
                  value={barColor}
                  onChange={(e) => setBarColor(e.target.value)}
                  className="w-7 h-7 rounded border border-slate-300 dark:border-white/20 cursor-pointer p-0 bg-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Background:</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-7 h-7 rounded border border-slate-300 dark:border-white/20 cursor-pointer p-0 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleDownloadPNG}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-brand-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res {activeSymbology.name.split(' ')[0]} PNG</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 transition border border-slate-200 dark:border-white/5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Sticker Sheet (A4 / Thermal Direct)</span>
            </button>
          </div>

        </div>

        {/* Right Output View (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {viewMode === 'single' ? (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0c1322] p-8 flex flex-col items-center justify-center min-h-[380px] shadow-2xl">
              
              {/* Product Sticker Card Simulation */}
              <div className="bg-white text-black p-6 rounded-xl shadow-2xl border border-slate-300 max-w-sm w-full text-center space-y-2">
                {productTitle && (
                  <p className="font-bold text-xs truncate uppercase tracking-tight text-slate-800">
                    {productTitle}
                  </p>
                )}
                
                <div className="py-2 flex justify-center overflow-hidden">
                  <canvas ref={singleCanvasRef} className="max-w-full h-auto block shadow-sm rounded" />
                </div>

                <div className="flex justify-between items-center text-xs font-mono font-bold border-t border-slate-200 pt-2 text-slate-700">
                  <span className="truncate max-w-[180px]">{dataText}</span>
                  {productPrice > 0 && <span className="text-emerald-700 font-extrabold">{format(productPrice)}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active Format: <strong>{activeSymbology.name}</strong> (Scan-Verified Standard)</span>
              </div>
            </div>
          ) : (
            /* Printable Sheet Grid */
            <div className="print-area rounded-2xl border border-slate-200 dark:border-white/10 bg-white p-6 shadow-2xl text-black">
              <div className="flex items-center justify-between border-b pb-3 mb-4 no-print text-slate-700 text-xs">
                <span className="font-bold">A4 Sticker Sheet Preview ({labelQuantity} Stickers)</span>
                <span className="text-slate-500">Ready for thermal or inkjet sticker paper</span>
              </div>

              <div className="print-grid grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: labelQuantity }).map((_, index) => (
                  <div key={index} className="border border-dashed border-slate-300 p-3 rounded-lg text-center bg-white flex flex-col items-center justify-center">
                    <p className="text-[10px] font-bold text-slate-800 truncate w-full mb-1">
                      {productTitle || dataText}
                    </p>
                    <div className="w-full flex justify-center">
                      <BarcodeMiniItem 
                        text={dataText} 
                        symbology={symbology}
                        barColor={barColor}
                        bgColor={bgColor}
                      />
                    </div>
                    <div className="flex justify-between w-full text-[9px] font-mono font-bold text-slate-600 mt-1">
                      <span className="truncate max-w-[90px]">{dataText}</span>
                      {productPrice > 0 && <span>{format(productPrice)}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AdPlaceholder slot="horizontal" />
        </div>

      </div>

      {/* SEO & Technical Guide for Barcodes */}
      <SEOGuide
        title="Comprehensive Barcode & 2D Symbology Selection Guide"
        subtitle="Understand the technical differences between Code 128, EAN-13, UPC-A, Code 39, ITF-14, Codabar, and QR Codes."
        formula="Code 128 (High Density 1D) | EAN/UPC (Global Retail POS) | ITF-14 (Logistics Carton) | QR Code (2D ISO/IEC 18004)"
        steps={[
          {
            title: "1. For General SKUs & Amazon FBA -> Code 128",
            description: "Always use Code 128 for product SKUs and Amazon FNSKUs. It encodes all uppercase & lowercase letters and numbers, and every character is scanned into your computer."
          },
          {
            title: "2. Why Codabar Strips A and B",
            description: "Codabar is a legacy medical/library format where letters A, B, C, and D are start/stop indicators. Barcode scanners automatically strip A/B and decode only the numeric payload."
          },
          {
            title: "3. 2D QR Code Smartphone Compatibility",
            description: "2D QR Codes generated here use ISO/IEC 18004 standard with Reed-Solomon Error Correction, allowing instantaneous camera scanning on iOS and Android."
          },
          {
            title: "4. Retail Checkout POS (EAN-13 / UPC-A)",
            description: "For goods sold in retail supermarkets, use EAN-13 (global) or UPC-A (North America)."
          }
        ]}
        tips={[
          "If you want letters like 'A' and 'B' in your scanned barcode string, select Code 128 or Code 39 instead of Codabar.",
          "Keep high contrast (black bars on white background) for 100% first-pass laser scanning accuracy."
        ]}
      />

      <FAQSection title="Barcode & Symbology FAQs" faqs={faqs} />
    </div>
  );
}

// Mini Barcode Component for Sticker Sheet Grid
function BarcodeMiniItem({ text, symbology, barColor, bgColor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && text) {
      drawUniversalBarcode(canvasRef.current, text, symbology, {
        barWidth: 1,
        height: 35,
        color: barColor,
        background: bgColor,
        showText: false
      });
    }
  }, [text, symbology, barColor, bgColor]);

  return <canvas ref={canvasRef} className="max-h-12 max-w-full block" />;
}
