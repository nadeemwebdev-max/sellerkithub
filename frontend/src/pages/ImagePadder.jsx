import React, { useState, useRef, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Check, 
  Layers
} from 'lucide-react';
import FAQSection from '../components/FAQSection';
import SEOGuide from '../components/SEOGuide';
import AdPlaceholder from '../components/AdPlaceholder';

export default function ImagePadder() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState('product-image');
  const [targetSize, setTargetSize] = useState(2000); // 2000x2000
  const [paddingPercent, setPaddingPercent] = useState(15); // 15% margin
  const [bgColor, setBgColor] = useState('#FFFFFF'); // Pure White
  const [isTransparent, setIsTransparent] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [exportFormat, setExportFormat] = useState('image/jpeg');
  const [exportQuality, setExportQuality] = useState(0.95);
  const [dragActive, setDragActive] = useState(false);

  const canvasRef = useRef(null);
  const loadedImageRef = useRef(null);

  // Handle Image File Loading
  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        loadedImageRef.current = img;
        setImageSrc(e.target.result);
        renderCanvas(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Render to Canvas
  const renderCanvas = (img = loadedImageRef.current) => {
    if (!img || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const size = parseInt(targetSize, 10) || 1000;
    canvas.width = size;
    canvas.height = size;

    // Background
    if (isTransparent) {
      ctx.clearRect(0, 0, size, size);
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    // Calculate Padded Bounding Box
    const pad = (size * (paddingPercent / 100));
    const availWidth = size - (pad * 2);
    const availHeight = size - (pad * 2);

    // Maintain Aspect Ratio of Original Image
    const imgAspect = img.width / img.height;
    let drawWidth, drawHeight;

    if (imgAspect > 1) {
      // Landscape
      drawWidth = availWidth * zoomLevel;
      drawHeight = (availWidth / imgAspect) * zoomLevel;
    } else {
      // Portrait or Square
      drawHeight = availHeight * zoomLevel;
      drawWidth = (availHeight * imgAspect) * zoomLevel;
    }

    const drawX = (size - drawWidth) / 2;
    const drawY = (size - drawHeight) / 2;

    // Enable High Quality Image Smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Re-render when controls change
  useEffect(() => {
    if (loadedImageRef.current) {
      renderCanvas(loadedImageRef.current);
    }
  }, [targetSize, paddingPercent, bgColor, isTransparent, zoomLevel]);

  // Load a demo sample product on first load if empty
  useEffect(() => {
    const demoCanvas = document.createElement('canvas');
    demoCanvas.width = 400;
    demoCanvas.height = 300;
    const ctx = demoCanvas.getContext('2d');
    
    // Draw nice sample product box
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(50, 40, 300, 220);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Sample Product', 200, 140);
    ctx.font = '16px sans-serif';
    ctx.fillText('Drop your image here', 200, 180);

    const img = new Image();
    img.onload = () => {
      loadedImageRef.current = img;
      setImageSrc(demoCanvas.toDataURL());
      renderCanvas(img);
    };
    img.src = demoCanvas.toDataURL();
  }, []);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ext = isTransparent || exportFormat === 'image/png' ? 'png' : exportFormat === 'image/webp' ? 'webp' : 'jpg';
    const mime = isTransparent ? 'image/png' : exportFormat;
    
    const dataUrl = canvas.toDataURL(mime, exportQuality);
    const link = document.createElement('a');
    link.download = `${imageName}-square-1x1.${ext}`;
    link.href = dataUrl;
    link.click();
  };

  const faqs = [
    {
      question: "Why do marketplaces like Amazon & Etsy require 1:1 square photos?",
      answer: "Square (1:1) aspect ratio images display consistently across desktop grids, mobile apps, and search result thumbnails without getting awkwardly cropped, cut off, or letterboxed by marketplace algorithms."
    },
    {
      question: "Does this tool upload my product photos to a server?",
      answer: "No. 100% of the image processing, padding, and resizing happens directly in your browser using HTML5 Canvas. Your photos never leave your device."
    },
    {
      question: "What is Amazon's requirement for main product images?",
      answer: "Amazon requires the main product image to be on a pure white background (RGB 255, 255, 255 or #FFFFFF), with the product filling at least 85% of the frame (approx 10%–15% padding) and a minimum resolution of 1000x1000 pixels to enable high-res zoom."
    },
    {
      question: "What resolution should I export for my Etsy listings?",
      answer: "Etsy recommends at least 2000x2000 pixels for listing photos so buyers on retina/4K displays can zoom in to inspect craftsmanship and details."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Private Client-Side Image Processor</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Product Photo <span className="text-emerald-600 dark:text-emerald-400">1:1 Square Padder</span> & Resizer
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Turn any rectangular product image into a clean 1:1 square photo with white background padding without stretching, cropping, or losing image quality.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controls (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-6 shadow-xl dark:shadow-2xl">
          <div className="border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Canvas & Padding Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize resolution, margins, and export format
            </p>
          </div>

          {/* Upload Button */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Upload Product Image
            </label>
            <label className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-brand-300 dark:border-brand-500/40 bg-brand-50/50 dark:bg-brand-500/5 hover:bg-brand-50 dark:hover:bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-semibold cursor-pointer transition">
              <Upload className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>Choose Photo (or Drag & Drop)</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* Target Resolution Preset */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Square Canvas Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { size: 2000, label: '2000 x 2000', sub: 'Etsy / Ultra HD' },
                { size: 1500, label: '1500 x 1500', sub: 'Amazon Zoom' },
                { size: 1000, label: '1000 x 1000', sub: 'Standard 1:1' },
              ].map((res) => (
                <button
                  key={res.size}
                  type="button"
                  onClick={() => setTargetSize(res.size)}
                  className={`p-2 rounded-xl text-center border transition ${
                    targetSize === res.size
                      ? 'bg-brand-600 text-white border-brand-600 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <span className="block text-xs font-mono">{res.label}</span>
                  <span className="block text-[9px] opacity-70">{res.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Padding Margin Slider */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="font-semibold">Outer Padding Margin:</span>
              <span className="font-mono text-brand-600 dark:text-brand-400 font-bold">{paddingPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={paddingPercent}
              onChange={(e) => setPaddingPercent(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0% (Tight)</span>
              <span>15% (Amazon Standard)</span>
              <span>40% (Spacious)</span>
            </div>
          </div>

          {/* Zoom Level */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="font-semibold">Product Zoom Scale:</span>
              <span className="font-mono text-brand-600 dark:text-brand-400 font-bold">{zoomLevel.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Background Color Choice */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Canvas Background Color
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setBgColor('#FFFFFF'); setIsTransparent(false); }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 ${
                  bgColor === '#FFFFFF' && !isTransparent
                    ? 'bg-white text-black font-bold border-slate-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-white border border-slate-400" />
                <span>Pure White (#FFF)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsTransparent(!isTransparent)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 ${
                  isTransparent
                    ? 'bg-brand-600 text-white font-bold border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                <span>Transparent (PNG)</span>
              </button>
            </div>
          </div>

          {/* Export Format */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Export File Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                disabled={isTransparent}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="image/jpeg">JPEG (.jpg)</option>
                <option value="image/png">PNG (.png)</option>
                <option value="image/webp">WebP (.webp)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Image Quality</label>
              <select
                value={exportQuality}
                onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="1.0">Maximum (100%)</option>
                <option value="0.95">High (95% - Recommended)</option>
                <option value="0.85">Medium (85%)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Right Preview Studio (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
              }
            }}
            className={`relative rounded-2xl border ${
              dragActive ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10' : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0c1322]'
            } p-6 flex flex-col items-center justify-center min-h-[420px] shadow-2xl transition overflow-hidden`}
          >
            
            {/* Resolution Badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono text-emerald-400 border border-white/10 shadow">
              {targetSize} x {targetSize} px (1:1 Square)
            </div>

            {/* Live Canvas Preview */}
            <div className="relative max-w-full max-h-[420px] shadow-2xl rounded-lg overflow-hidden border border-slate-300 dark:border-white/10">
              <canvas
                ref={canvasRef}
                className="max-h-[380px] max-w-full w-auto object-contain block"
              />
            </div>

            {/* Quick Helper */}
            <p className="text-[11px] text-slate-500 mt-4">
              Real-time High-Resolution Canvas Preview (Rendered client-side)
            </p>
          </div>

          {/* Download Action Bar */}
          <button
            onClick={handleDownload}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-glow-emerald"
          >
            <Download className="w-5 h-5" />
            <span>Download {targetSize}x{targetSize} Square Product Photo</span>
          </button>

          <AdPlaceholder slot="horizontal" />
        </div>

      </div>

      <SEOGuide
        title="Amazon, Etsy & Shopify Product Photo Sizing Standards"
        subtitle="Ensure your main product photos get maximum click-through rates and pass strict marketplace quality audits."
        formula="Canvas Output = Width: 2000px | Height: 2000px | Background: #FFFFFF | Product Coverage: 85% Frame Area"
        steps={[
          {
            title: "1. 1000x1000px Minimum for Amazon Zoom",
            description: "Amazon's interactive hover zoom requires listing images to be at least 1,000 pixels on the longest side."
          },
          {
            title: "2. Pure White Backgrounds (#FFFFFF)",
            description: "Amazon policy explicitly prohibits off-white, grey, or textured backgrounds for the primary listing photo."
          },
          {
            title: "3. Avoid Cropping Artifacts",
            description: "Using padding prevents product edges, handles, or labels from being sliced off in search grid view."
          }
        ]}
        tips={[
          "Export in High Quality JPEG (95%) for optimal web compression and faster loading on buyer mobile devices.",
          "Keep 15% outer padding to prevent your item from touching the outer bounding box."
        ]}
      />

      <FAQSection title="Product Image Padder FAQs" faqs={faqs} />

    </div>
  );
}
