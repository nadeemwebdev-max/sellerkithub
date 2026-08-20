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
  Info,
  BookOpen,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { 
  SUPPORTED_SYMBOLOGIES, 
  drawUniversalBarcode 
} from '../utils/barcode';
import FAQSection from '../components/FAQSection';
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
  const [labelQuantity, setLabelQuantity] = useState(12);
  const [viewMode, setViewMode] = useState('single');

  const singleCanvasRef = useRef(null);

  const activeSymbology = SUPPORTED_SYMBOLOGIES.find(s => s.id === symbology) || SUPPORTED_SYMBOLOGIES[0];

  const handleSymbologyChange = (newSymbology) => {
    setSymbology(newSymbology);
    const found = SUPPORTED_SYMBOLOGIES.find(s => s.id === newSymbology);
    if (found) {
      setDataText(found.sample);
    }
  };

  useEffect(() => {
    if (viewMode === 'single' && singleCanvasRef.current && dataText) {
      drawUniversalBarcode(singleCanvasRef.current, dataText, symbology, {
        barWidth,
        barHeight,
        showText: showHumanText,
        barColor,
        bgColor
      });
    }
  }, [symbology, dataText, barWidth, barHeight, showHumanText, barColor, bgColor, viewMode]);

  const handleDownloadSinglePNG = () => {
    if (!singleCanvasRef.current) return;
    const link = document.createElement('a');
    link.download = `barcode-${symbology}-${dataText}.png`;
    link.href = singleCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handlePrintSheet = () => {
    window.print();
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
    },
    {
      question: "What is the difference between 1D linear barcodes and 2D QR codes?",
      answer: "1D linear barcodes (Code 128, UPC, EAN) store data horizontally in parallel lines and hold limited alphanumeric strings. 2D QR codes store data both vertically and horizontally in a matrix pattern, holding up to 7,000 characters (ideal for website URLs, warranty registration, and digital user manuals)."
    },
    {
      question: "Are generated barcode images royalty-free for commercial use?",
      answer: "Yes! All barcodes and QR codes generated by SellerKitHub are 100% free and royalty-free for commercial packaging, retail labeling, Amazon FBA shipments, and store distribution."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <BarcodeIcon className="w-3.5 h-3.5" />
          <span>Industrial Barcode & 30-Up Label Generator</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Free Barcode & <span className="text-brand-600 dark:text-brand-400">Label Sheet Generator</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Generate Code 128, EAN-13, UPC-A, Code 39, and QR code barcode labels. Export high-res PNG graphics or print standard 30-up Avery 5160 label sheets.
        </p>
      </div>

      {/* View Mode Toggle Banner */}
      <div className="flex justify-center mb-8">
        <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 inline-flex gap-1">
          <button
            onClick={() => setViewMode('single')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              viewMode === 'single'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Single Barcode Studio
          </button>
          <button
            onClick={() => setViewMode('sheet')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              viewMode === 'sheet'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Printable 30-Up Sheet (Avery 5160)
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Generator Controls */}
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
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Barcode Encoded Data String
              </label>
              <input
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
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Product Title (For Printed Label)
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Product Price ({activeCurrency.symbol})
              </label>
              <input
                type="number"
                value={productPrice || ''}
                onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bar Height: {barHeight}px
                </label>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={barHeight}
                  onChange={(e) => setBarHeight(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bar Width: {barWidth}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={barWidth}
                  onChange={(e) => setBarWidth(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHumanText}
                  onChange={(e) => setShowHumanText(e.target.checked)}
                  className="rounded text-brand-600"
                />
                <span>Include Human-Readable Text Below Bars</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={handleDownloadSinglePNG}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>

            <button
              onClick={handlePrintSheet}
              className="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-brand-600/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print 30-Up Sheet</span>
            </button>
          </div>
        </div>

        {/* Live Preview Studio */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a12] p-6 sm:p-8 flex flex-col items-center justify-center min-h-[420px]">
          {viewMode === 'single' ? (
            <div className="p-8 rounded-2xl bg-white text-slate-900 border border-slate-300 shadow-2xl text-center space-y-4 max-w-md w-full">
              <span className="text-xs font-bold block uppercase tracking-wider text-slate-600">
                {productTitle}
              </span>
              <div className="flex justify-center my-2">
                <canvas ref={singleCanvasRef} className="max-w-full" />
              </div>
              <span className="font-mono text-sm font-extrabold text-brand-600 block">
                {activeCurrency.symbol}{productPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-900 dark:text-brand-300 text-xs flex items-center justify-between">
                <span>Printable 30-Up Avery 5160 Layout Preview</span>
                <button onClick={handlePrintSheet} className="font-bold underline text-brand-600">Print Now</button>
              </div>

              {/* 30-Up Sheet Grid */}
              <div className="grid grid-cols-3 gap-2 p-4 bg-white text-slate-900 rounded-xl border border-slate-300">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="p-2 border border-dashed border-slate-300 rounded text-center text-[10px] space-y-1">
                    <span className="truncate font-semibold block">{productTitle}</span>
                    <div className="font-mono font-bold text-slate-800 text-[11px] py-1 bg-slate-50 border">
                      |||| | ||||| || {dataText}
                    </div>
                    <span className="font-mono font-bold text-brand-600 block">{activeCurrency.symbol}{productPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Image 1: Barcode Generator Studio */}
      <img
        src="/images/barcode-label-generator.svg"
        alt="Code 128 and UPC Barcode Generator Studio interface with human readable text"
        className="w-full h-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg my-8"
        loading="lazy"
        decoding="async"
      />

      <AdPlaceholder slot="horizontal" />

      {/* Barcode Symbology Specification Reference Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
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

      {/* Image 2: 30-Up Avery Sheet Diagram */}
      <img
        src="/images/30-up-avery-label-sheet-preview.svg"
        alt="Printable 30-Up Avery 5160 FNSKU Label Sheet Preview for Amazon FBA inventory"
        className="w-full h-auto rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg my-8"
        loading="lazy"
        decoding="async"
      />

      {/* Worked Label Printing Scenarios */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked Step-by-Step Barcode Printing Scenarios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 1: Amazon FBA FNSKU Labels
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Symbology:</strong> Code 128.<br />
              <strong>Data String:</strong> `X001ABC123`<br />
              <strong>Target Format:</strong> Printable 30-Up Avery 5160 sheet.<br />
              <strong>Outcome:</strong> Prints 30 scannable Amazon FBA unit labels with product title and price on a single page.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 2: Retail Packaging EAN-13
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Symbology:</strong> EAN-13.<br />
              <strong>Data String:</strong> `4012345678901`<br />
              <strong>Target Format:</strong> Single High-Res PNG.<br />
              <strong>Outcome:</strong> Exports crisp barcode graphic ready to embed in Adobe Illustrator packaging artwork.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 3: Customer Care QR Code
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Symbology:</strong> QR Code.<br />
              <strong>Data String:</strong> `https://sellerkithub.com`<br />
              <strong>Target Format:</strong> Single Vector SVG.<br />
              <strong>Outcome:</strong> Generates instant smartphone-scannable QR code for package inserts and warranty cards.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 4: ITF-14 Master Carton Barcode
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Symbology:</strong> Code 128 / ITF-14.<br />
              <strong>Data String:</strong> `10812345678901`<br />
              <strong>Target Format:</strong> High-Res 300 DPI PNG.<br />
              <strong>Outcome:</strong> Prints bold outer-carton barcodes for bulk pallet identification at receiving docks.
            </p>
          </div>

        </div>
      </section>

      {/* Structured FAQ Section */}
      <FAQSection title="Free Barcode Generator FAQs" faqs={faqs} />
    </div>
  );
}
