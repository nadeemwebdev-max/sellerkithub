import React, { useState, useRef, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Download, 
  RefreshCw, 
  RotateCcw,
  RotateCw,
  Sparkles, 
  Check, 
  Layers,
  BookOpen,
  BarChart3,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';
import { useI18n } from '../i18n/utils';
import { getFaqsForLang } from '../i18n/faqs';
import RelatedTools from '../components/RelatedTools';
import FAQSection from '../components/FAQSection';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBio from '../components/AuthorBio';
import AffiliateCTA from '../components/AffiliateCTA';

export default function ImagePadder({ lang: propLang }) {
  const { lang, t } = useI18n(propLang);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState('product-image');
  const [targetSize, setTargetSize] = useState(2000);
  const [paddingPercent, setPaddingPercent] = useState(15);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [isTransparent, setIsTransparent] = useState(false);
  const [exportFormat, setExportFormat] = useState('image/jpeg');
  const [exportQuality, setExportQuality] = useState(0.95);
  const [dragActive, setDragActive] = useState(false);

  const canvasRef = useRef(null);
  const loadedImageRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageName(file.name.replace(/\.[^/.]+$/, ''));
    setRotationAngle(0);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        loadedImageRef.current = img;
        setImageSrc(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const renderCanvas = (img = loadedImageRef.current) => {
    if (!img || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const size = parseInt(targetSize, 10) || 1000;
    canvas.width = size;
    canvas.height = size;

    if (isTransparent) {
      ctx.clearRect(0, 0, size, size);
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    const padPct = parseFloat(paddingPercent) / 100;
    const maxDrawWidth = size * (1 - 2 * padPct);
    const maxDrawHeight = size * (1 - 2 * padPct);

    // Swap aspect ratio dimensions if rotated 90° or 270°
    const isVerticalRotation = rotationAngle === 90 || rotationAngle === 270;
    const effWidth = isVerticalRotation ? img.height : img.width;
    const effHeight = isVerticalRotation ? img.width : img.height;

    const imgAspect = effWidth / effHeight;
    let drawW, drawH;

    if (imgAspect > 1) {
      drawW = maxDrawWidth;
      drawH = maxDrawWidth / imgAspect;
    } else {
      drawH = maxDrawHeight;
      drawW = maxDrawHeight * imgAspect;
    }

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);

    if (isVerticalRotation) {
      ctx.drawImage(img, -drawH / 2, -drawW / 2, drawH, drawW);
    } else {
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    }

    ctx.restore();
  };

  useEffect(() => {
    if (imageSrc && loadedImageRef.current) {
      renderCanvas(loadedImageRef.current);
    }
  }, [imageSrc, targetSize, paddingPercent, bgColor, isTransparent, rotationAngle]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const mime = isTransparent ? 'image/png' : exportFormat;
    const ext = mime === 'image/png' ? 'png' : 'jpg';
    const dataUrl = canvasRef.current.toDataURL(mime, exportQuality);

    const link = document.createElement('a');
    link.download = `${imageName}-1x1-padded.${ext}`;
    link.href = dataUrl;
    link.click();
  };

  const faqs = getFaqsForLang('image', lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 text-xs font-semibold border border-brand-200 dark:border-brand-500/20 mb-3">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{t('footer.privacyBadge')}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('image.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          {t('image.subtitle')}
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Controls Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] p-6 sm:p-8 space-y-5 shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Canvas & Padding Controls
            </h2>
            <button
              onClick={() => {
                setTargetSize(2000);
                setPaddingPercent(15);
                setBgColor('#FFFFFF');
                setIsTransparent(false);
                setRotationAngle(0);
              }}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Drag and Drop Zone */}
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
            className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
              dragActive
                ? 'border-brand-500 bg-brand-500/10'
                : 'border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-white/[0.02] hover:border-brand-400'
            }`}
            onClick={() => document.getElementById('image-upload-input').click()}
          >
            <input
              id="image-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            />
            <Upload className="w-8 h-8 text-brand-600 dark:text-brand-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
              Click to upload or drag & drop product photo
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Supports PNG, JPG, WebP, HEIC (Max 50MB)
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="img-target-size" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Target Canvas Resolution
              </label>
              <select
                id="img-target-size"
                aria-label="Target Canvas Resolution"
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-brand-500"
              >
                <option value={2000} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">2000 x 2000 px (Recommended for Amazon & Etsy Zoom)</option>
                <option value={1600} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">1600 x 1600 px (Standard eBay Grid)</option>
                <option value={1200} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">1200 x 1200 px (Standard Website)</option>
                <option value={1000} className="bg-white dark:bg-[#0c1322] text-slate-900 dark:text-slate-100">1000 x 1000 px (Minimum Amazon Zoom)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="img-padding-percent" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Padding Margin Buffer: {paddingPercent}%
                </label>
              </div>
              <input
                id="img-padding-percent"
                aria-label="Padding Margin Buffer percentage"
                type="range"
                min="0"
                max="35"
                value={paddingPercent}
                onChange={(e) => setPaddingPercent(e.target.value)}
                className="w-full accent-brand-600"
              />
            </div>

            {/* Photo Rotation Control */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Rotate Photo Orientation ({rotationAngle}°)
                </label>
                {rotationAngle !== 0 && (
                  <button
                    type="button"
                    onClick={() => setRotationAngle(0)}
                    className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                  >
                    Reset Angle
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRotationAngle((prev) => (prev - 90 + 360) % 360)}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-200 dark:hover:bg-white/10 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  <span>Rotate 90° Left</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRotationAngle((prev) => (prev + 90) % 360)}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-200 dark:hover:bg-white/10 transition"
                >
                  <RotateCw className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  <span>Rotate 90° Right</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="img-bg-color" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                Canvas Background Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="img-bg-color"
                  aria-label="Canvas Background Color Picker"
                  type="color"
                  value={bgColor}
                  disabled={isTransparent}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer disabled:opacity-30"
                />
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => { setBgColor('#FFFFFF'); setIsTransparent(false); }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
                  >
                    Pure White (#FFF)
                  </button>

                  <label htmlFor="img-transparent" className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 cursor-pointer ml-2">
                    <input
                      id="img-transparent"
                      aria-label="Transparent PNG background"
                      type="checkbox"
                      checked={isTransparent}
                      onChange={(e) => setIsTransparent(e.target.checked)}
                      className="rounded text-brand-600"
                    />
                    <span>Transparent PNG</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={!imageSrc}
            className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:bg-slate-300 dark:disabled:bg-white/10 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-brand-600/20 disabled:shadow-none"
          >
            <Download className="w-4 h-4" />
            <span>Download 1:1 Square Photo</span>
          </button>
        </div>

        {/* Live Canvas Preview Panel */}
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
          onClick={() => {
            if (!imageSrc) {
              document.getElementById('image-upload-input').click();
            }
          }}
          className={`lg:col-span-7 rounded-2xl border transition-all p-6 sm:p-8 flex flex-col items-center justify-center min-h-[420px] ${
            !imageSrc ? 'cursor-pointer hover:border-brand-500/50 hover:bg-slate-200/50 dark:hover:bg-[#091120]' : ''
          } ${
            dragActive
              ? 'border-brand-500 bg-brand-500/10'
              : 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060a12]'
          }`}
        >
          {imageSrc ? (
            <div className="space-y-4 text-center w-full flex flex-col items-center">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[360px] object-contain rounded-xl border border-slate-300 dark:border-white/10 shadow-xl"
              />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Preview: {targetSize}x{targetSize}px | {paddingPercent}% Margin
                </span>

                {/* Canvas Quick Rotation Control */}
                <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-white/10 px-2 py-1 rounded-lg">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRotationAngle((prev) => (prev - 90 + 360) % 360);
                    }}
                    className="p-1 rounded text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition"
                    title="Rotate 90° Left"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 px-1">
                    {rotationAngle}°
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRotationAngle((prev) => (prev + 90) % 360);
                    }}
                    className="p-1 rounded text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition"
                    title="Rotate 90° Right"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('image-upload-input').click();
                  }}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 space-y-3 p-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Click or drag & drop product photo here
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PNG, JPG, WebP, HEIC (Instant 1:1 Canvas Preview & 90° Rotation)
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Author Bio & E-E-A-T Component */}
      <AuthorBio 
        lang={lang}
      />

      {/* Recommended Seller Tools Affiliate Component */}
      <AffiliateCTA 
        platform="general" 
        lang={lang}
      />

      {/* Marketplace Image Requirement Reference Table */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Marketplace Image Aspect Ratio & Background Requirements
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Official listing photo guidelines across Amazon, Etsy, eBay, Shopify, Meesho, and Walmart.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-100 font-semibold">
                <th className="p-3">Platform</th>
                <th className="p-3">Canvas Aspect Ratio</th>
                <th className="p-3">Recommended Dimensions</th>
                <th className="p-3">Main Photo Background</th>
                <th className="p-3">Zoom Capability Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Amazon FBA</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">1:1 Square</td>
                <td className="p-3 font-mono">2000 x 2000 px</td>
                <td className="p-3 font-mono text-emerald-600 font-bold">100% Pure White (#FFFFFF)</td>
                <td className="p-3">Min 1000px for hover zoom</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Etsy Store</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">1:1 Square or 4:3</td>
                <td className="p-3 font-mono">2000 x 2000 px</td>
                <td className="p-3">Neutral, light gray, or lifestyle</td>
                <td className="p-3">High resolution for zoom</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">eBay Marketplace</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">1:1 Square</td>
                <td className="p-3 font-mono">1600 x 1600 px</td>
                <td className="p-3">Pure white or clean gray</td>
                <td className="p-3">Min 500px required</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Shopify Store</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">1:1 Square</td>
                <td className="p-3 font-mono">2048 x 2048 px</td>
                <td className="p-3">Brand aesthetic or transparent</td>
                <td className="p-3">Theme dependent zoom</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Walmart Marketplace</td>
                <td className="p-3 font-mono text-brand-600 dark:text-brand-400">1:1 Square</td>
                <td className="p-3 font-mono">2000 x 2000 px</td>
                <td className="p-3 font-mono text-emerald-600 font-bold">Seamless Pure White (#FFFFFF)</td>
                <td className="p-3">Min 1000px for hover zoom</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step Worked Scenarios */}
      <section className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked Image Resizing & Rotation Scenarios
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 1: Sideways Phone Photo
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Original:</strong> Sideways 90° rotated photo.<br />
              <strong>Action:</strong> Click 'Rotate 90° Right' and set 2000x2000 canvas with 15% margin.<br />
              <strong>Result:</strong> Corrects photo orientation upright and adds clean white padding.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 2: Vertical Model Shot for Etsy
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Original:</strong> 800x1200 Tall vertical photo.<br />
              <strong>Action:</strong> Set 2000x2000 canvas with soft off-white background.<br />
              <strong>Result:</strong> Adds side padding buffer so the model photo is not cropped when displayed in Etsy's mobile search grid.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 3: Transparent Logo Canvas
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Original:</strong> Non-square transparent PNG.<br />
              <strong>Action:</strong> Toggle 'Transparent PNG' mode on 1200x1200 canvas.<br />
              <strong>Result:</strong> Exports clean square transparent PNG ready for website hero banners.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
              Scenario 4: High-Res Retina Theme Padding
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Original:</strong> 4000x3000 Raw DSLR photo.<br />
              <strong>Action:</strong> Set 2048x2048 canvas with 10% padding.<br />
              <strong>Result:</strong> Generates crisp 2048px square image for high-density Apple Retina displays.
            </p>
          </div>

        </div>
      </section>

      {/* Master Image Strategy Article */}
      <article className="my-12 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] text-slate-800 dark:text-slate-200 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Visual Optimization Guide</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Why High-Resolution 1:1 Square Photos Drive Higher Click-Through Rates
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            How visual padding and upright orientation improve mobile search visibility, conversion rates, and algorithm indexing.
          </p>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            1. Mobile First: Maximizing Screen Real Estate
          </h3>
          <p>
            Over 70% of e-commerce purchases are completed on smartphone screens. Mobile shopping apps display search results in two-column 1:1 square image grids. When you upload non-square or sideways photos without padding, marketplaces automatically crop the edges, cutting off product handles, labels, or key visual details. Rotating and padding your photos creates a consistent framing buffer, keeping 100% of your product visible in search thumbnails.
          </p>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            2. Meeting Strict Marketplace Compliance (Amazon #FFFFFF Rule)
          </h3>
          <p>
            Amazon strictly enforces its main image guidelines: the main image must have a 100% pure white background (#FFFFFF) with no text, borders, or watermarks. Our tool fills canvas padding with exact #FFFFFF RGB values, guaranteeing full Amazon Seller Central compliance and preventing listing suppressions.
          </p>
        </div>
      </article>

      {/* Cross-Tool Navigation Component */}
      <RelatedTools currentPath="/tools/product-image-resizer" lang={lang} />

      {/* Structured FAQ Section */}
      <FAQSection lang={lang} faqs={faqs} />
    </div>
  );
}
