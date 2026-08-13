import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

export const SUPPORTED_SYMBOLOGIES = [
  { 
    id: 'CODE128', 
    name: 'Code 128 (Universal / Amazon FNSKU / SKU)', 
    category: '1D Standard (Alphanumeric)', 
    sample: 'SKU-ELITE-2026',
    description: 'Universal standard for Amazon FBA, Shopify, and e-commerce inventory. Supports all letters, numbers, and symbols.'
  },
  { 
    id: 'EAN13', 
    name: 'EAN-13 (International Retail Point-of-Sale)', 
    category: 'Retail & Supermarkets', 
    sample: '590123412345',
    description: 'Standard 13-digit retail barcode used worldwide (Europe, Asia, Global). Last digit is auto-calculated checksum.'
  },
  { 
    id: 'UPC', 
    name: 'UPC-A (North American Retail Standard)', 
    category: 'Retail & Supermarkets', 
    sample: '012345678905',
    description: 'Standard 12-digit barcode used for retail products across the United States and Canada.'
  },
  { 
    id: 'EAN8', 
    name: 'EAN-8 (Compact Retail)', 
    category: 'Retail & Supermarkets', 
    sample: '96385074',
    description: 'Compact 8-digit barcode designed for small product packaging where EAN-13 does not fit.'
  },
  { 
    id: 'CODE39', 
    name: 'Code 39 (Industrial, Defense & Automotive)', 
    category: 'Industrial & Inventory', 
    sample: 'PART-98472',
    description: 'Classic alphanumeric barcode used widely in government, automotive, and warehouse inventory tracking.'
  },
  { 
    id: 'ITF14', 
    name: 'ITF-14 (Outer Master Carton & Pallets)', 
    category: 'Logistics & Freight', 
    sample: '10012345678902',
    description: '14-digit heavy-duty barcode with wide tolerance for printing directly on brown corrugated cardboard cartons.'
  },
  { 
    id: 'codabar', 
    name: 'Codabar / NW-7 (Libraries & Medical Labs)', 
    category: 'Specialized 1D', 
    sample: 'A12345678B',
    description: 'Numeric barcode with start/stop characters (A, B, C, D). Note: Scanners use A/B as start/stop flags and decode only the numbers.'
  },
  { 
    id: 'qrcode', 
    name: 'QR Code (2D ISO/IEC 18004 Standard URL & Text)', 
    category: '2D Matrix (Smartphones)', 
    sample: 'https://sellerkit.tools',
    description: 'Standard 2D QR Code scannable by all iPhone & Android camera apps for product URLs, manuals, and payments.'
  },
];

/**
 * Universal Drawing Function supporting both 1D (JsBarcode) and 2D QR (QRCode)
 */
export async function drawUniversalBarcode(canvas, text, symbology = 'CODE128', options = {}) {
  if (!canvas || !text) return;

  const barColor = options.color || '#000000';
  const bgColor = options.background || '#ffffff';
  const showText = options.showText !== false;
  const barWidth = options.barWidth || 2;
  const height = options.height || 70;

  // -------------------------------------------------------------
  // 1. 2D QR CODE (ISO/IEC 18004 Standard - Phone Camera Scannable)
  // -------------------------------------------------------------
  if (symbology === 'qrcode') {
    try {
      const qrOptions = {
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: barWidth * 3 || 6,
        color: {
          dark: barColor,
          light: bgColor
        }
      };

      await QRCode.toCanvas(canvas, text, qrOptions);

      // Add human readable text below QR code if enabled
      if (showText) {
        const ctx = canvas.getContext('2d');
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        const textHeight = 28;

        // Create temporary copy
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = oldWidth;
        tempCanvas.height = oldHeight;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0);

        canvas.height = oldHeight + textHeight;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);

        ctx.font = '600 12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = barColor;
        const truncated = text.length > 32 ? text.slice(0, 30) + '...' : text;
        ctx.fillText(truncated, oldWidth / 2, oldHeight + 18);
      }
    } catch (err) {
      console.error("QR Code Generation Error:", err);
    }
    return;
  }

  // -------------------------------------------------------------
  // 2. 1D LINEAR BARCODES (JsBarcode Standard Compliance)
  // -------------------------------------------------------------
  try {
    let cleanText = text.trim();

    // Specific formatting adjustments for strict barcode standards
    if (symbology === 'EAN13' || symbology === 'UPC') {
      cleanText = cleanText.replace(/[^0-9]/g, '');
      if (symbology === 'EAN13' && cleanText.length < 12) cleanText = cleanText.padStart(12, '0');
      if (symbology === 'UPC' && cleanText.length < 11) cleanText = cleanText.padStart(11, '0');
    } else if (symbology === 'EAN8') {
      cleanText = cleanText.replace(/[^0-9]/g, '');
      if (cleanText.length < 7) cleanText = cleanText.padStart(7, '0');
    } else if (symbology === 'ITF14') {
      cleanText = cleanText.replace(/[^0-9]/g, '');
      if (cleanText.length < 14) cleanText = cleanText.padStart(14, '0');
    } else if (symbology === 'codabar') {
      cleanText = cleanText.toUpperCase().replace(/[^0-9\-$:\/.+ABCD]/g, '');
      if (!cleanText.startsWith('A') && !cleanText.startsWith('B') && !cleanText.startsWith('C') && !cleanText.startsWith('D')) {
        cleanText = 'A' + cleanText + 'B';
      }
    }

    JsBarcode(canvas, cleanText, {
      format: symbology,
      width: barWidth,
      height: height,
      displayValue: showText,
      font: '"JetBrains Mono", monospace',
      fontSize: 14,
      textMargin: 6,
      margin: 12,
      background: bgColor,
      lineColor: barColor,
      valid: function(valid) {
        if (!valid) {
          console.warn("Invalid barcode format for:", cleanText, symbology);
        }
      }
    });
  } catch (err) {
    // If strict format validation fails (e.g. invalid checksum), fallback gracefully to Code 128
    console.warn(`Fallback to Code 128 due to: ${err.message}`);
    try {
      JsBarcode(canvas, text, {
        format: 'CODE128',
        width: barWidth,
        height: height,
        displayValue: showText,
        font: '"JetBrains Mono", monospace',
        fontSize: 14,
        margin: 12,
        background: bgColor,
        lineColor: barColor
      });
    } catch (fallbackErr) {
      console.error("Barcode render error:", fallbackErr);
    }
  }
}
