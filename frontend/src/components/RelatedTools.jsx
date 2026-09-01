import React from 'react';
import Link from './Link';
import { 
  TrendingUp, 
  ShoppingBag, 
  Grid, 
  Target, 
  GitCompare, 
  Package, 
  Image as ImageIcon, 
  Barcode, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useI18n } from '../i18n/utils';
import { trackEvent, TRACKED_EVENTS } from '../utils/analytics';

const RELATED_TRANSLATIONS = {
  en: {
    badge: "Complete Utility Suite",
    title: "Explore More Free Seller Tools",
    viewAll: "View All Calculators",
    useTool: "Use Tool",
    tools: {
      amazon: { name: "Amazon FBA Calculator", desc: "Calculate referral, FBA pick & pack, and storage fees." },
      etsy: { name: "Etsy Fee Calculator", desc: "Factoring listing fees, 6.5% transaction, and offsite ads." },
      comparison: { name: "Marketplace Comparison", desc: "Side-by-side net profit comparison across Amazon, Etsy & eBay." },
      batch: { name: "Multi-SKU Batch Calculator", desc: "Bulk profit analysis for entire catalog inventories." },
      barcode: { name: "Free Barcode & QR Generator", desc: "Generate printable UPC, EAN, Code128 and QR labels instantly." },
      'avery-qr': { name: "Avery QR Code Generator", desc: "Printable QR code label sheets for Avery 5160, 5163 & 5164." },
      'fba-shipping': { name: "FBA Shipping & Freight", desc: "Model Amazon inbound freight and placement service fees." },
      walmart: { name: "Walmart Seller Calculator", desc: "Model Walmart 6%-15% referral rates, WFS fulfillment & net margins." },
      'etsy-digital': { name: "Etsy Digital Fee Calculator", desc: "Calculate fees for digital downloads, printables & templates ($0 shipping)." },
      resizer: { name: "1:1 Product Photo Resizer", desc: "Pad & center listing images to perfect 1:1 square canvas." },
      margin: { name: "Profit Margin Matrix", desc: "Quickly calculate target markup % and selling price targets." },
      roas: { name: "ROAS & PPC Ad Calculator", desc: "Determine break-even ROAS and target ad spend profitability." }
    }
  },
  es: {
    badge: "Suite Completa de Herramientas",
    title: "Explorar Más Herramientas Gratuitas",
    viewAll: "Ver Todas las Calculadoras",
    useTool: "Usar Herramienta",
    tools: {
      amazon: { name: "Calculadora Amazon FBA", desc: "Calcula comisiones por referencia, FBA pick & pack y almacenaje." },
      etsy: { name: "Calculadora de Tarifas Etsy", desc: "Incluye tarifas por anuncio, 6.5% por transacción y anuncios externos." },
      comparison: { name: "Comparador de Marketplaces", desc: "Comparación lado a lado de beneficio neto en Amazon, Etsy y eBay." },
      batch: { name: "Calculadora Multi-SKU en Lote", desc: "Análisis masivo de beneficios para catálogos completos." },
      barcode: { name: "Generador de Códigos y QR", desc: "Genera etiquetas imprimibles UPC, EAN, Code 128 y QR al instante." },
      'avery-qr': { name: "Generador de QR Avery", desc: "Hojas imprimibles de códigos QR para Avery 5160, 5163 y 5164." },
      'fba-shipping': { name: "Envíos y Fletes FBA", desc: "Modela fletes de entrada a Amazon y tarifas de colocación." },
      walmart: { name: "Calculadora Walmart Seller", desc: "Comisiones de 6%-15%, logística WFS y márgenes netos." },
      'etsy-digital': { name: "Calculadora Etsy Productos Digitales", desc: "Calcula tarifas para descargas digitales y plantillas ($0 envío)." },
      resizer: { name: "Redimensionador de Fotos 1:1", desc: "Centra y añade márgenes para crear imágenes cuadradas 1:1." },
      margin: { name: "Matriz de Márgenes y Margen Bruto", desc: "Calcula márgenes objetivo y precios de venta ideales." },
      roas: { name: "Calculadora de ROAS y Anuncios PPC", desc: "Calcula el ROAS de equilibrio y rentabilidad publicitaria." }
    }
  },
  ja: {
    badge: "総合出品者ツール",
    title: "他の無料出品者ツールを探索",
    viewAll: "すべての計算ツールを見る",
    useTool: "ツールを使う",
    tools: {
      amazon: { name: "Amazon FBA 計算ツール", desc: "販売手数料、FBA出荷手数料、月額保管料を正確にシミュレーション。" },
      etsy: { name: "Etsy 手数料計算ツール", desc: "出品料、6.5%取引手数料、オフサイト広告料を反映。" },
      comparison: { name: "モール別 利益比較ツール", desc: "Amazon・Etsy・eBayの手取り利益を並べて比較。" },
      batch: { name: "一括バッチ計算ツール", desc: "複数SKUカタログ全体の利益を一括シミュレーション。" },
      barcode: { name: "バーコード＆QRコード生成", desc: "UPC、EAN、Code128、QRラベルを即座に作成・印刷。" },
      'avery-qr': { name: "Avery QRコード生成ツール", desc: "Avery 5160/5163対応のQRコードシート作成。" },
      'fba-shipping': { name: "FBA 納品送料・配置手数料", desc: "Amazon納品送料と2026年配置手数料をモデル化。" },
      walmart: { name: "Walmart 出品手数料計算", desc: "6%-15%の手数料率、WFSフルフィルメントと純利益。" },
      'etsy-digital': { name: "Etsy デジタル商品計算ツール", desc: "デジタルダウンロード・型紙向け手数料計算（送料0円）。" },
      resizer: { name: "1:1 正方形画像リサイズ", desc: "商品画像を正方形キャンバスに余白調整・センタリング。" },
      margin: { name: "利益率＆マークアップ表", desc: "目標利益率から販売価格を素早く逆算。" },
      roas: { name: "目標ROAS・PPC広告計算", desc: "損益分岐点ROASと広告費の採算性を算出。" }
    }
  },
  fr: {
    badge: "Suite Complète d'Utilitaires",
    title: "Explorer Plus d'Outils Gratuits",
    viewAll: "Voir Tous les Calculateurs",
    useTool: "Utiliser l'Outil",
    tools: {
      amazon: { name: "Calculateur Amazon FBA", desc: "Estimez les frais de vente, de préparation FBA et de stockage." },
      etsy: { name: "Calculateur de Frais Etsy", desc: "Intègre les frais de mise en vente, transaction de 6,5% et pub." },
      comparison: { name: "Comparateur de Marketplaces", desc: "Comparez les marges nettes sur Amazon, Etsy et eBay côte à côte." },
      batch: { name: "Calculateur Multi-SKU en Lot", desc: "Analyse groupée de rentabilité pour inventaires entiers." },
      barcode: { name: "Générateur de Codes-Barres & QR", desc: "Créez des étiquettes imprimables UPC, EAN, Code 128 et QR." },
      'avery-qr': { name: "Générateur QR Avery", desc: "Planches d'étiquettes QR pour formats Avery 5160, 5163 et 5164." },
      'fba-shipping': { name: "Fret & Expédition FBA", desc: "Modélisez le transport entrant et les frais de placement Amazon." },
      walmart: { name: "Calculateur Vendeur Walmart", desc: "Taux de 6% à 15%, traitement WFS et marges nettes." },
      'etsy-digital': { name: "Calculateur Etsy Produits Digitaux", desc: "Frais pour téléchargements numériques et modèles ($0 port)." },
      resizer: { name: "Redimensionneur Photo 1:1", desc: "Recadrez et ajoutez des bordures pour un rendu carré 1:1 parfait." },
      margin: { name: "Matrice de Marge & Coefficient", desc: "Calculez vos coefficients et prix de vente cibles." },
      roas: { name: "Calculateur ROAS & Publicité PPC", desc: "Déterminez le ROAS d'équilibre et la rentabilité publicitaire." }
    }
  },
  de: {
    badge: "Vollständige Tool-Suite",
    title: "Weitere kostenlose Tools entdecken",
    viewAll: "Alle Rechner anzeigen",
    useTool: "Tool öffnen",
    tools: {
      amazon: { name: "Amazon FBA Rechner", desc: "Verkaufsgebühren, FBA-Versand und monatliche Lagergebühren." },
      etsy: { name: "Etsy Gebührenrechner", desc: "Einstellgebühren, 6,5% Transaktionsgebühr und Offsite-Ads." },
      comparison: { name: "Marktplatz-Vergleich", desc: "Nettogewinn-Vergleich für Amazon, Etsy und eBay." },
      batch: { name: "Multi-SKU Stapelrechner", desc: "Massen-Rentabilitätsanalyse für ganze Kataloge." },
      barcode: { name: "Barcode- & QR-Generator", desc: "Druckbare UPC-, EAN-, Code 128- und QR-Etiketten erstellen." },
      'avery-qr': { name: "Avery QR-Code Generator", desc: "QR-Code Etikettenbogen für Avery 5160, 5163 & 5164." },
      'fba-shipping': { name: "FBA Fracht & Anlieferung", desc: "Amazon Inbound-Fracht und Platzierungsgebühren berechnen." },
      walmart: { name: "Walmart Seller Rechner", desc: "6%-15% Gebührensätze, WFS-Fulfillment und Nettomargen." },
      'etsy-digital': { name: "Etsy Digitalprodukte Rechner", desc: "Gebühren für digitale Downloads und Druckvorlagen ($0 Versand)." },
      resizer: { name: "1:1 Produktbild-Optimierer", desc: "Bilder zentrieren und auf 1:1 Quadratformat auffüllen." },
      margin: { name: "Gewinnspannen-Matrix", desc: "Ziel-Aufschläge und ideale Verkaufspreise ermitteln." },
      roas: { name: "ROAS- & PPC-Werberechner", desc: "Break-Even-ROAS und Werbe-Rentabilität kalkulieren." }
    }
  },
  pt: {
    badge: "Conjunto Completo de Ferramentas",
    title: "Explorar Mais Ferramentas Gratuitas",
    viewAll: "Ver Todas as Calculadoras",
    useTool: "Usar Ferramenta",
    tools: {
      amazon: { name: "Calculadora Amazon FBA", desc: "Calcule comissões, manuseio FBA e taxas de armazenamento." },
      etsy: { name: "Calculadora de Taxas Etsy", desc: "Inclui taxas de listagem, 6,5% de transação e anúncios externos." },
      comparison: { name: "Comparador de Marketplaces", desc: "Comparação lado a lado de lucro líquido na Amazon, Etsy e eBay." },
      batch: { name: "Calculadora em Lote Multi-SKU", desc: "Análise de margem em massa para catálogos inteiros." },
      barcode: { name: "Gerador de Código de Barras e QR", desc: "Gere etiquetas imprimíveis UPC, EAN, Code 128 e QR instantaneamente." },
      'avery-qr': { name: "Gerador QR Avery", desc: "Folhas de etiquetas QR para modelos Avery 5160, 5163 e 5164." },
      'fba-shipping': { name: "Frete e Envio FBA", desc: "Calcule frete de entrada e taxas de alocação da Amazon." },
      walmart: { name: "Calculadora Walmart Seller", desc: "Comissões de 6%-15%, logística WFS e margens reais." },
      'etsy-digital': { name: "Calculadora Etsy Produtos Digitais", desc: "Taxas para downloads digitais e modelos ($0 frete)." },
      resizer: { name: "Redimensionador de Fotos 1:1", desc: "Centralize e adicione margens para fotos quadradas 1:1." },
      margin: { name: "Matriz de Margens e Markup", desc: "Calcule percentuais de markup e metas de preço de venda." },
      roas: { name: "Calculadora de ROAS e Anúncios PPC", desc: "Descubra o ROAS de equilíbrio e retorno publicitário." }
    }
  },
  ko: {
    badge: "전체 셀러 유틸리티 도구",
    title: "더 많은 무료 셀러 도구 탐색",
    viewAll: "모든 계산기 보기",
    useTool: "도구 사용",
    tools: {
      amazon: { name: "아마존 FBA 수익 계산기", desc: "판매 수수료, FBA 주문처리비 및 월 보관료를 정밀 계산." },
      etsy: { name: "Etsy 수수료 계산기", desc: "등록 수수료, 6.5% 거래 수수료 및 오프사이트 광고비 포함." },
      comparison: { name: "마켓플레이스 수익 비교", desc: "Amazon, Etsy, eBay 순이익 나란히 비교." },
      batch: { name: "다중 SKU 일괄 계산기", desc: "전체 카탈로그 인벤토리 대량 수익성 분석." },
      barcode: { name: "바코드 & QR코드 생성기", desc: "인쇄 가능한 UPC, EAN, Code128 및 QR 라벨 즉시 생성." },
      'avery-qr': { name: "에이버리 QR 라벨 생성기", desc: "Avery 5160, 5163 및 5164 인쇄용 라벨 시트 생성." },
      'fba-shipping': { name: "FBA 배송 및 입고 수수료", desc: "아마존 입고 운임 및 2026 재고 배치 서비스 수수료 모델링." },
      walmart: { name: "월마트 셀러 계산기", desc: "6%-15% 수수료율, WFS 풀필먼트 및 순마진 분석." },
      'etsy-digital': { name: "Etsy 디지털 상품 수수료 계산기", desc: "디지털 다운로드 및 템플릿 수수료 계산 (배송비 $0)." },
      resizer: { name: "1:1 정방형 상품 이미지 리사이저", desc: "상품 사진을 1:1 정사각형 캔버스에 여백 채우기." },
      margin: { name: "수익 마진 및 마크업 매트릭스", desc: "목표 마크업 % 및 최적 판매가 신속 계산." },
      roas: { name: "목표 ROAS 및 PPC 광고 계산기", desc: "손익분기 ROAS 및 광고비 지출 수익성 산출." }
    }
  },
  it: {
    badge: "Suite Completa di Strumenti",
    title: "Esplora Altri Strumenti Gratuiti",
    viewAll: "Visualizza Tutti i Calcolatori",
    useTool: "Usa Strumento",
    tools: {
      amazon: { name: "Calcolatore Amazon FBA", desc: "Calcola commissioni di vendita, logistica FBA e stoccaggio." },
      etsy: { name: "Calcolatore Tariffe Etsy", desc: "Include tariffe di inserzione, 6,5% di transazione e pubblicità." },
      comparison: { name: "Confronto Marketplace", desc: "Confronto affiancato del profitto netto su Amazon, Etsy ed eBay." },
      batch: { name: "Calcolatore Multi-SKU in Blocco", desc: "Analisi di profitto aggregata per interi cataloghi." },
      barcode: { name: "Generatore Codici a Barre & QR", desc: "Genera etichette stampabili UPC, EAN, Code 128 e QR." },
      'avery-qr': { name: "Generatore QR Avery", desc: "Fogli di etichette QR per modelli Avery 5160, 5163 e 5164." },
      'fba-shipping': { name: "Spedizioni e Frecce FBA", desc: "Calcola trasporto in ingresso e tariffe di collocamento Amazon." },
      walmart: { name: "Calcolatore Venditore Walmart", desc: "Commissioni dal 6% al 15%, logistica WFS e margini netti." },
      'etsy-digital': { name: "Calcolatore Etsy Prodotti Digitali", desc: "Tariffe per download digitali e modelli ($0 spedizione)." },
      resizer: { name: "Ridimensionatore Foto 1:1", desc: "Centra e aggiungi margini per immagini quadrate 1:1." },
      margin: { name: "Matrice Margine & Ricarico", desc: "Calcola le percentuali di ricarico e prezzi di vendita target." },
      roas: { name: "Calcolatore ROAS & Annunci PPC", desc: "Determina il ROAS di pareggio e il ritorno pubblicitario." }
    }
  }
};

const BASE_TOOLS = [
  {
    id: 'amazon',
    path: '/tools/amazon-fba-calculator',
    icon: TrendingUp,
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
  },
  {
    id: 'etsy',
    path: '/tools/etsy-fee-calculator',
    icon: ShoppingBag,
    color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20'
  },
  {
    id: 'comparison',
    path: '/tools/marketplace-comparison',
    icon: GitCompare,
    color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20'
  },
  {
    id: 'batch',
    path: '/tools/batch-calculator',
    icon: Package,
    color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20'
  },
  {
    id: 'barcode',
    path: '/tools/barcode-generator',
    icon: Barcode,
    color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20'
  },
  {
    id: 'avery-qr',
    path: '/tools/avery-qr-code-generator',
    icon: Barcode,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
  },
  {
    id: 'fba-shipping',
    path: '/tools/fba-shipping-calculator',
    icon: TrendingUp,
    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
  },
  {
    id: 'walmart',
    path: '/tools/walmart-fee-calculator',
    icon: ShoppingBag,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20'
  },
  {
    id: 'etsy-digital',
    path: '/tools/etsy-digital-fee-calculator',
    icon: ShoppingBag,
    color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20'
  },
  {
    id: 'resizer',
    path: '/tools/product-image-resizer',
    icon: ImageIcon,
    color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20'
  },
  {
    id: 'margin',
    path: '/tools/profit-margin-calculator',
    icon: Grid,
    color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20'
  },
  {
    id: 'roas',
    path: '/tools/roas-calculator',
    icon: Target,
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
  }
];

export default function RelatedTools({ currentPath = '', lang: propLang, title: customTitle }) {
  const { lang } = useI18n(propLang);
  const trans = RELATED_TRANSLATIONS[lang] || RELATED_TRANSLATIONS.en;

  // Filter out the current path to show relevant alternative tools
  const visibleTools = BASE_TOOLS.filter(
    (tool) => !currentPath.includes(tool.path) && tool.path !== currentPath
  ).slice(0, 4);

  return (
    <section className="mt-14 pt-10 border-t border-slate-200 dark:border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{trans.badge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            {customTitle || trans.title}
          </h2>
        </div>
        <Link
          to="/#all-calculators-directory"
          lang={lang}
          onClick={() => {
            trackEvent(TRACKED_EVENTS.TOOL_CLICK, { tool: 'all_tools_home' });
            const el = document.getElementById('all-calculators-directory');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition"
        >
          <span>{trans.viewAll}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleTools.map((tool) => {
          const IconComponent = tool.icon;
          const toolInfo = trans.tools[tool.id] || RELATED_TRANSLATIONS.en.tools[tool.id] || { name: tool.id, desc: '' };

          return (
            <Link
              key={tool.id}
              to={tool.path}
              lang={lang}
              onClick={() => trackEvent(TRACKED_EVENTS.TOOL_CLICK, { target: tool.path })}
              className="group p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-3 ${tool.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {toolInfo.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {toolInfo.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                <span>{trans.useTool}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
