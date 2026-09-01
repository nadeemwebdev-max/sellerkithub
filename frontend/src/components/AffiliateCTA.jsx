import React from 'react';
import { ExternalLink, Sparkles, Award } from 'lucide-react';
import { useI18n } from '../i18n/utils';

export const AFFILIATE_TRANSLATIONS = {
  en: {
    titleAmazon: "Recommended Amazon FBA Growth & Research Software",
    descAmazon: "Accelerate your product research, lower FBA storage fees, and automate PPC management.",
    titleEtsy: "Recommended Etsy Growth & SEO Tools",
    descEtsy: "Optimize your listing tags, automate print-on-demand fulfillment, and track search rankings.",
    titleGeneral: "Recommended E-Commerce Growth Tools",
    descGeneral: "Boost your net margins and scale store revenue with top-rated seller automation software.",
    partnerRec: "*Partner Recommendations",
    visitPartner: "Visit Partner",
    disclosure: "FTC Disclosure: SellerKitHub maintains editorial independence. When you sign up for services via our partner links, we may receive an affiliate referral commission at zero extra cost to you.",
    h10Badge: "Top FBA Tool",
    h10Desc: "Product research, Amazon keyword tracker, and automated FBA inventory forecasting.",
    h10Tag: "Save 30% Off",
    jsBadge: "Supplier DB",
    jsDesc: "Find verified factory suppliers, track competitor sales volume, and audit PPC campaigns.",
    jsTag: "Exclusive Discount",
    erankBadge: "Etsy SEO",
    erankDesc: "Analyze Etsy search trends, audit listing tag compliance, and track competitor views.",
    erankTag: "Free Trial",
    printifyBadge: "Print-on-Demand",
    printifyDesc: "Create custom apparel and home goods with automated sync to Etsy & Shopify.",
    printifyTag: "Start Free",
    shopifyBadge: "D2C Leader",
    shopifyDesc: "Launch your independent online store with 0% platform referral fees.",
    shopifyTag: "$1/Month Promo",
    payoneerBadge: "Cross-Border",
    payoneerDesc: "Receive global marketplace payouts in USD, EUR, GBP & INR with lower fx fees.",
    payoneerTag: "$50 Bonus"
  },
  es: {
    titleAmazon: "Software Recomendado de Crecimiento e Investigación para Amazon FBA",
    descAmazon: "Acelera la búsqueda de productos ganadores, reduce costes de almacenamiento FBA y optimiza tus campañas PPC.",
    titleEtsy: "Herramientas Recomendadas de SEO y Crecimiento para Etsy",
    descEtsy: "Optimiza etiquetas de productos, automatiza la impresión bajo demanda y mejora tu posicionamiento.",
    titleGeneral: "Herramientas Recomendadas para Vendedores Online",
    descGeneral: "Aumenta tus márgenes netos y escala tus ventas con el mejor software de automatización.",
    partnerRec: "*Recomendaciones de Socios",
    visitPartner: "Visitar Socio",
    disclosure: "Aviso de Transparencia: SellerKitHub mantiene total independencia editorial. Al registrarte a través de nuestros enlaces de socios, podemos recibir una comisión sin ningún coste adicional para ti.",
    h10Badge: "Mejor Herramienta FBA",
    h10Desc: "Investigación de productos, rastreo de palabras clave en Amazon y previsión de inventario FBA.",
    h10Tag: "Ahorra 30% Dto.",
    jsBadge: "Base de Proveedores",
    jsDesc: "Encuentra fabricantes verificados, analiza ventas de competidores y audita campañas PPC.",
    jsTag: "Descuento Exclusivo",
    erankBadge: "SEO para Etsy",
    erankDesc: "Analiza tendencias de búsqueda en Etsy, audita etiquetas y sigue a la competencia.",
    erankTag: "Prueba Gratis",
    printifyBadge: "Impresión bajo Demanda",
    printifyDesc: "Crea ropa y artículos personalizados con sincronización automática a Etsy y Shopify.",
    printifyTag: "Empieza Gratis",
    shopifyBadge: "Líder en D2C",
    shopifyDesc: "Lanza tu tienda online independiente con 0% de comisiones por venta de plataforma.",
    shopifyTag: "Promo 1€/Mes",
    payoneerBadge: "Pagos Globales",
    payoneerDesc: "Recibe pagos internacionales en USD, EUR, GBP e INR con tarifas de cambio reducidas.",
    payoneerTag: "Bono de $50"
  },
  ja: {
    titleAmazon: "Amazon FBA 推奨リサーチ＆売上拡大ツール",
    descAmazon: "商品リサーチの高速化、FBA保管料の削減、PPC広告運用の自動化を実現。",
    titleEtsy: "Etsy 推奨SEO＆出品自動化ツール",
    descEtsy: "検索タグの最適化、オンデマンド印刷の自動連携、検索順位の追跡に対応。",
    titleGeneral: "ECセラー推奨 売上＆利益拡大ツール",
    descGeneral: "トップクラスの自動化ソフトウェアで純利益率を高め、ストア売上を最大化します。",
    partnerRec: "※提携ツール推奨",
    visitPartner: "パートナーサイトを見る",
    disclosure: "広告開示情報：SellerKitHubは編集の独立性を維持しています。パートナーリンク経由でお申し込みいただいた場合、ユーザーに追加費用なしで紹介手数料を受け取る場合があります。",
    h10Badge: "最高峰FBAツール",
    h10Desc: "商品リサーチ、Amazonキーワード追跡、FBA在庫予測の自動化。",
    h10Tag: "30%オフ特典",
    jsBadge: "サプライヤー検索",
    jsDesc: "認定工場の検索、競合セラーの販売量分析、PPC広告監査。",
    jsTag: "限定割引あり",
    erankBadge: "Etsy専用SEO",
    erankDesc: "Etsy検索トレンド分析、出品タグ診断、競合トラッキング。",
    erankTag: "無料体験",
    printifyBadge: "オンデマンド印刷",
    printifyDesc: "アパレルや雑貨のオリジナル商品を制作し、Etsy＆Shopifyへ自動同期。",
    printifyTag: "無料で開始",
    shopifyBadge: "自社ECトップ",
    shopifyDesc: "プラットフォーム販売手数料0%で独立したオンラインストアを開設。",
    shopifyTag: "初月1ドル",
    payoneerBadge: "海外送金・受取",
    payoneerDesc: "USD、EUR、GBP、INRなどの海外売上金を低為替手数料でスムーズに受取。",
    payoneerTag: "50ドルボーナス"
  },
  fr: {
    titleAmazon: "Logiciels Recommandés de Croissance et Recherche Amazon FBA",
    descAmazon: "Accélérez votre recherche de produits, réduisez vos frais de stockage FBA et automatisez votre pub PPC.",
    titleEtsy: "Outils Recommandés de SEO et Vente Etsy",
    descEtsy: "Optimisez vos tags, automatisez le print-on-demand et suivez vos positions dans les recherches.",
    titleGeneral: "Outils E-Commerce Recommandés",
    descGeneral: "Boostez vos marges nettes et développez votre chiffre d'affaires avec les meilleurs logiciels d'automatisation.",
    partnerRec: "*Recommandations de Partenaires",
    visitPartner: "Visiter le Partenaire",
    disclosure: "Transparence : SellerKitHub conserve son indépendance éditoriale. En utilisant nos liens partenaires, nous pouvons recevoir une commission sans aucun surcoût pour vous.",
    h10Badge: "Meilleur Outil FBA",
    h10Desc: "Recherche produit, suivi des mots-clés Amazon et prévision des stocks FBA.",
    h10Tag: "-30% de Réduction",
    jsBadge: "Fournisseurs Vérifiés",
    jsDesc: "Trouvez des fabricants fiables, suivez les ventes concurrentes et auditez vos pubs PPC.",
    jsTag: "Remise Exclusive",
    erankBadge: "SEO pour Etsy",
    erankDesc: "Analysez les tendances Etsy, auditez vos tags et surveillez la concurrence.",
    erankTag: "Essai Gratuit",
    printifyBadge: "Print-on-Demand",
    printifyDesc: "Créez des vêtements et objets personnalisés avec synchronisation Etsy & Shopify.",
    printifyTag: "Démarrer Gratuitement",
    shopifyBadge: "Leader D2C",
    shopifyDesc: "Créez votre boutique en ligne autonome avec 0% de commission de vente.",
    shopifyTag: "Promo 1€/mois",
    payoneerBadge: "Paiements Mondiaux",
    payoneerDesc: "Recevez vos revenus en USD, EUR, GBP et INR avec des frais de change réduits.",
    payoneerTag: "Bonus de 50$"
  },
  de: {
    titleAmazon: "Empfohlene Amazon FBA Wachstums- & Analysesoftware",
    descAmazon: "Beschleunigen Sie die Produktrecherche, senken Sie Lagergebühren und automatisieren Sie PPC-Kampagnen.",
    titleEtsy: "Empfohlene Etsy SEO- & Automatisierungs-Tools",
    descEtsy: "Optimieren Sie Listing-Tags, automatisieren Sie Print-on-Demand und verfolgen Sie Suchrankings.",
    titleGeneral: "Empfohlene E-Commerce Tools",
    descGeneral: "Steigern Sie Ihre Nettomarge und skalieren Sie Ihren Shop-Umsatz mit führenden Automatisierungs-Tools.",
    partnerRec: "*Partner-Empfehlungen",
    visitPartner: "Partner besuchen",
    disclosure: "Hinweis: SellerKitHub wahrt redaktionelle Unabhängigkeit. Wenn Sie sich über unsere Partnerlinks anmelden, erhalten wir möglicherweise eine Provision – ohne Zusatzkosten für Sie.",
    h10Badge: "Top FBA Tool",
    h10Desc: "Produktrecherche, Keyword-Tracker und automatisierte FBA-Lagerbestandsprognosen.",
    h10Tag: "30% Rabatt",
    jsBadge: "Lieferanten-DB",
    jsDesc: "Geprüfte Hersteller finden, Verkaufszahlen der Konkurrenz analysieren und PPC optimieren.",
    jsTag: "Exklusiver Rabatt",
    erankBadge: "Etsy SEO",
    erankDesc: "Etsy-Suchtrends analysieren, Tags prüfen und Wettbewerber beobachten.",
    erankTag: "Kostenlos testen",
    printifyBadge: "Print-on-Demand",
    printifyDesc: "Personalisierte Kleidung & Deko erstellen mit automatischer Synchronisierung zu Etsy & Shopify.",
    printifyTag: "Kostenlos starten",
    shopifyBadge: "D2C Marktführer",
    shopifyDesc: "Starten Sie Ihren eigenen Online-Shop mit 0% Marktplatz-Verkaufsprovision.",
    shopifyTag: "1€/Monat Aktion",
    payoneerBadge: "Globale Auszahlungen",
    payoneerDesc: "Weltweite E-Commerce-Auszahlungen in USD, EUR, GBP & INR zu günstigen Konditionen empfangen.",
    payoneerTag: "50$ Bonus"
  },
  pt: {
    titleAmazon: "Softwares Recomendados para Crescimento e Pesquisa Amazon FBA",
    descAmazon: "Acelere a pesquisa de produtos, reduza custos de armazenagem FBA e automatize sua publicidade PPC.",
    titleEtsy: "Ferramentas Recomendadas de SEO e Gestão para Etsy",
    descEtsy: "Otimize tags de produtos, automatize impressão sob demanda e rastreie posições de busca.",
    titleGeneral: "Ferramentas Recomendadas de E-Commerce",
    descGeneral: "Aumente suas margens líquidas e escale o faturamento com os melhores softwares de automação.",
    partnerRec: "*Recomendações de Parceiros",
    visitPartner: "Visitar Parceiro",
    disclosure: "Transparência: SellerKitHub mantém independência editorial. Ao assinar serviços através dos nossos links parceiros, podemos receber uma comissão sem nenhum custo extra para você.",
    h10Badge: "Melhor Ferramenta FBA",
    h10Desc: "Pesquisa de produtos, rastreador de palavras-chave na Amazon e previsão de estoque FBA.",
    h10Tag: "30% de Desconto",
    jsBadge: "Base de Fornecedores",
    jsDesc: "Encontre fabricantes verificados, analise vendas da concorrência e audite campanhas PPC.",
    jsTag: "Desconto Exclusivo",
    erankBadge: "SEO para Etsy",
    erankDesc: "Analise tendências no Etsy, audite tags de anúncios e acompanhe concorrentes.",
    erankTag: "Teste Grátis",
    printifyBadge: "Impressão sob Demanda",
    printifyDesc: "Crie roupas e produtos personalizados com sincronização automática para Etsy e Shopify.",
    printifyTag: "Comece Grátis",
    shopifyBadge: "Líder em D2C",
    shopifyDesc: "Crie sua loja virtual própria com 0% de taxas de comissão por venda.",
    shopifyTag: "Promoção $1/Mês",
    payoneerBadge: "Pagamentos Globais",
    payoneerDesc: "Receba pagamentos internacionais em USD, EUR, GBP e INR com tarifas reduzidas de câmbio.",
    payoneerTag: "Bônus de $50"
  },
  ko: {
    titleAmazon: "아마존 FBA 셀러 추천 리서치 & 매출 성장 소프트웨어",
    descAmazon: "유망 상품 발굴 속도 향상, FBA 보관료 절감, PPC 광고 자동화 운영을 지원합니다.",
    titleEtsy: "Etsy 셀러 추천 SEO 및 자동화 도구",
    descEtsy: "리스팅 검색 태그 최적화, 주문형 인쇄(POD) 자동 연동, 검색 순위 모니터링.",
    titleGeneral: "글로벌 이커머스 셀러 추천 자동화 도구",
    descGeneral: "업계 최고 수준의 자동화 도구로 순마진을 높이고 매장 매출을 극대화하세요.",
    partnerRec: "※파트너 추천 도구",
    visitPartner: "파트너 사이트 방문",
    disclosure: "제휴 공지: SellerKitHub는 독립적인 분석 기준을 유지합니다. 파트너 링크를 통해 서비스에 가입하실 경우, 이용자에게 추가 비용 없이 소정의 수수료를 지급받을 수 있습니다.",
    h10Badge: "최고의 FBA 툴",
    h10Desc: "상품 리서치, 아마존 키워드 추적, FBA 재고 수요 예측 자동화.",
    h10Tag: "30% 할인 혜택",
    jsBadge: "공급업체 DB",
    jsDesc: "검증된 제조공장 발굴, 경쟁사 판매량 추적, PPC 광고 캠페인 감사.",
    jsTag: "단독 특별 할인",
    erankBadge: "Etsy 전문 SEO",
    erankDesc: "Etsy 검색 트렌드 분석, 리스팅 태그 적합성 진단, 경쟁사 추적.",
    erankTag: "무료 체험",
    printifyBadge: "주문형 인쇄(POD)",
    printifyDesc: "맞춤형 의류 및 굿즈를 제작하여 Etsy 및 Shopify로 자동 동기화.",
    printifyTag: "무료로 시작",
    shopifyBadge: "D2C 독립몰 1위",
    shopifyDesc: "플랫폼 수수료 0%로 나만의 독립형 온라인 쇼핑몰을 구축하세요.",
    shopifyTag: "월 1달러 프로모션",
    payoneerBadge: "해외 정산 계좌",
    payoneerDesc: "USD, EUR, GBP, INR 글로벌 마켓플레이스 정산금을 낮은 환율 수수료로 수취.",
    payoneerTag: "50달러 보너스"
  },
  it: {
    titleAmazon: "Software Consigliati di Ricerca e Crescita per Amazon FBA",
    descAmazon: "Accelera la ricerca di prodotti vincenti, riduci i costi di stoccaggio FBA e automatizza la pubblicità PPC.",
    titleEtsy: "Strumenti Consigliati di SEO e Gestione per Etsy",
    descEtsy: "Ottimizza i tag delle inserzioni, automatizza il print-on-demand e monitora il posizionamento.",
    titleGeneral: "Strumenti Consigliati per Venditori E-Commerce",
    descGeneral: "Aumenta i tuoi margini netti e fai scalare le vendite con i migliori software di automazione.",
    partnerRec: "*Strumenti Consigliati",
    visitPartner: "Visita Partner",
    disclosure: "Trasparenza: SellerKitHub mantiene totale indipendenza editoriale. Se ti registri tramite i nostri link partner, potremmo ricevere una commissione senza alcun costo aggiuntivo per te.",
    h10Badge: "Miglior Tool FBA",
    h10Desc: "Ricerca prodotti, monitoraggio parole chiave su Amazon e previsione scorte FBA.",
    h10Tag: "Risparmia il 30%",
    jsBadge: "Database Fornitori",
    jsDesc: "Trova produttori verificati, analizza le vendite dei concorrenti e ottimizza il PPC.",
    jsTag: "Sconto Esclusivo",
    erankBadge: "SEO per Etsy",
    erankDesc: "Analizza i trend di ricerca su Etsy, controlla i tag e monitora i concorrenti.",
    erankTag: "Prova Gratuita",
    printifyBadge: "Print-on-Demand",
    printifyDesc: "Crea abbigliamento e oggetti personalizzati con sincronizzazione automatica a Etsy e Shopify.",
    printifyTag: "Inizia Gratis",
    shopifyBadge: "Leader D2C",
    shopifyDesc: "Crea il tuo negozio online autonomo con 0% di commissioni di vendita sulla piattaforma.",
    shopifyTag: "Promo 1€/Mese",
    payoneerBadge: "Pagamenti Globali",
    payoneerDesc: "Ricevi i pagamenti in USD, EUR, GBP e INR con commissioni di cambio ridotte.",
    payoneerTag: "Bonus di $50"
  }
};

export default function AffiliateCTA({
  platform = "amazon",
  title,
  description,
  lang: propLang
}) {
  const { lang } = useI18n(propLang);
  const t = AFFILIATE_TRANSLATIONS[lang] || AFFILIATE_TRANSLATIONS.en;

  const defaultTitle = platform === 'amazon' 
    ? t.titleAmazon 
    : platform === 'etsy' 
      ? t.titleEtsy 
      : t.titleGeneral;

  const defaultDescription = platform === 'amazon'
    ? t.descAmazon
    : platform === 'etsy'
      ? t.descEtsy
      : t.descGeneral;

  const recommendations = {
    amazon: [
      {
        name: "Helium 10",
        badge: t.h10Badge,
        desc: t.h10Desc,
        tag: t.h10Tag,
        url: "https://i.helium10.com/c/7672631/3054775/37271",
        color: "from-blue-600 to-indigo-600"
      },
      {
        name: "Jungle Scout",
        badge: t.jsBadge,
        desc: t.jsDesc,
        tag: t.jsTag,
        url: "https://www.junglescout.com/",
        color: "from-amber-500 to-orange-600"
      }
    ],
    etsy: [
      {
        name: "eRank",
        badge: t.erankBadge,
        desc: t.erankDesc,
        tag: t.erankTag,
        url: "https://erank.com/",
        color: "from-purple-600 to-pink-600"
      },
      {
        name: "Printify",
        badge: t.printifyBadge,
        desc: t.printifyDesc,
        tag: t.printifyTag,
        url: "https://printify.com/",
        color: "from-emerald-600 to-teal-600"
      }
    ],
    general: [
      {
        name: "Shopify Store",
        badge: t.shopifyBadge,
        desc: t.shopifyDesc,
        tag: t.shopifyTag,
        url: "https://www.shopify.com/",
        color: "from-emerald-600 to-green-700"
      },
      {
        name: "Payoneer",
        badge: t.payoneerBadge,
        desc: t.payoneerDesc,
        tag: t.payoneerTag,
        url: "https://www.payoneer.com/",
        color: "from-blue-600 to-cyan-600"
      }
    ]
  };

  const currentTools = recommendations[platform] || recommendations.general;

  return (
    <section className="my-8 p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1322] space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <Award className="w-4 h-4 text-brand-500" />
            <span>{title || defaultTitle}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            {description || defaultDescription}
          </p>
        </div>
        <span className="text-[10px] text-slate-600 dark:text-slate-400 italic">
          {t.partnerRec}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentTools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${tool.name} - ${tool.badge} (opens in new tab)`}
            className="group relative p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-brand-500 transition-all flex flex-col justify-between font-sans"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                  {tool.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-500/20">
                  {tool.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {tool.desc}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-2.5 text-xs">
              <span className="font-semibold text-brand-600 dark:text-brand-400 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {tool.tag}
              </span>
              <span className="text-slate-400 group-hover:text-brand-500 transition flex items-center gap-0.5 text-[11px] font-medium">
                {t.visitPartner} <ExternalLink className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-slate-600 dark:text-slate-400 text-center pt-2">
        {t.disclosure}
      </p>
    </section>
  );
}
