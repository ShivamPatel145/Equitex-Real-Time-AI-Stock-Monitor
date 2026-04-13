export const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/search", label: "Search" },
  { href: '/watchlist', label: 'Watchlist' },
];

// Sign-up form select options
export const INVESTMENT_GOALS = [
  { value: "Growth", label: "Growth" },
  { value: "Income", label: "Income" },
  { value: "Balanced", label: "Balanced" },
  { value: "Conservative", label: "Conservative" },
];

export const RISK_TOLERANCE_OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const PREFERRED_INDUSTRIES = [
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Energy", label: "Energy" },
  { value: "Consumer Goods", label: "Consumer Goods" },
];

export const ALERT_TYPE_OPTIONS = [
  { value: "upper", label: "Upper" },
  { value: "lower", label: "Lower" },
];

export const CONDITION_OPTIONS = [
  { value: "greater", label: "Greater than (>)" },
  { value: "less", label: "Less than (<)" },
];

// TradingView Charts
export const MARKET_OVERVIEW_WIDGET_CONFIG = {
  colorTheme: "dark", // dark mode
  dateRange: "12M", // last 12 months
  locale: "en", // language
  largeChartUrl: "", // link to a large chart if needed
  isTransparent: true, // makes background transparent
  showFloatingTooltip: true, // show tooltip on hover
  plotLineColorGrowing: "#0FEDBE", // teal
  plotLineColorFalling: "#FF495B", // red
  gridLineColor: "rgba(240, 243, 250, 0)", // grid line color
  scaleFontColor: "#DBDBDB", // font color for scale
  belowLineFillColorGrowing: "rgba(15, 237, 190, 0.12)", // teal fill under line when growing
  belowLineFillColorFalling: "rgba(255, 73, 91, 0.12)", // red fill under line when falling
  belowLineFillColorGrowingBottom: "rgba(15, 237, 190, 0)",
  belowLineFillColorFallingBottom: "rgba(255, 73, 91, 0)",
  symbolActiveColor: "rgba(15, 237, 190, 0.05)", // highlight color for active symbol
  tabs: [
    {
      title: "Financial",
      symbols: [
        { s: "BSE:HDFCBANK", d: "HDFC Bank Ltd." },
        { s: "BSE:ICICIBANK", d: "ICICI Bank Ltd." },
        { s: "BSE:SBIN", d: "State Bank of India" },
        { s: "BSE:AXISBANK", d: "Axis Bank Ltd." },
        { s: "BSE:KOTAKBANK", d: "Kotak Mahindra Bank" },
        { s: "BSE:BAJFINANCE", d: "Bajaj Finance Ltd." },
      ],
    },
    {
      title: "Technology",
      symbols: [
        { s: "BSE:TCS", d: "Tata Consultancy Services" },
        { s: "BSE:INFY", d: "Infosys Ltd." },
        { s: "BSE:HCLTECH", d: "HCL Technologies" },
        { s: "BSE:WIPRO", d: "Wipro Ltd." },
        { s: "BSE:TECHM", d: "Tech Mahindra" },
        { s: "BSE:LTIM", d: "LTIMindtree Ltd." },
      ],
    },
    {
      title: "Energy & Others",
      symbols: [
        { s: "BSE:RELIANCE", d: "Reliance Industries" },
        { s: "BSE:BHARTIARTL", d: "Bharti Airtel" },
        { s: "BSE:ONGC", d: "ONGC" },
        { s: "BSE:ITC", d: "ITC Ltd." },
        { s: "BSE:LT", d: "Larsen & Toubro" },
      ],
    },
  ],
  support_host: "https://www.tradingview.com", // TradingView host
  backgroundColor: "#141414", // background color
  width: "100%", // full width
  height: 600, // height in px
  showSymbolLogo: true, // show logo next to symbols
  showChart: true, // display mini chart
};

export const HEATMAP_WIDGET_CONFIG = {
  dataSource: "SENSEX",
  market: "india",
  blockSize: "market_cap_basic",
  blockColor: "change",
  grouping: "sector",
  isTransparent: true,
  locale: "en",
  symbolUrl: "",
  colorTheme: "dark",
  exchanges: ["BSE", "NSE"],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: "100%",
  height: "600",
};

export const TOP_STORIES_WIDGET_CONFIG = {
  displayMode: "regular",
  feedMode: "symbol",
  symbol: "BSE:SENSEX",
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: "600",
};

export const MARKET_DATA_WIDGET_CONFIG = {
  title: "Indian Stocks",
  width: "100%",
  height: 600,
  locale: "en",
  showSymbolLogo: true,
  colorTheme: "dark",
  isTransparent: false,
  backgroundColor: "#0F0F0F",
  symbolsGroups: [
    {
      name: "Financial",
      symbols: [
        { name: "BSE:HDFCBANK", displayName: "HDFC Bank Ltd." },
        { name: "BSE:ICICIBANK", displayName: "ICICI Bank Ltd." },
        { name: "BSE:SBIN", displayName: "State Bank of India" },
        { name: "BSE:AXISBANK", displayName: "Axis Bank Ltd." },
        { name: "BSE:KOTAKBANK", displayName: "Kotak Mahindra Bank" },
        { name: "BSE:BAJFINANCE", displayName: "Bajaj Finance Ltd." },
      ],
    },
    {
      name: "Technology",
      symbols: [
        { name: "BSE:TCS", displayName: "Tata Consultancy Services" },
        { name: "BSE:INFY", displayName: "Infosys Ltd." },
        { name: "BSE:HCLTECH", displayName: "HCL Technologies" },
        { name: "BSE:WIPRO", displayName: "Wipro Ltd." },
        { name: "BSE:TECHM", displayName: "Tech Mahindra" },
        { name: "BSE:LTIM", displayName: "LTIMindtree Ltd." },
      ],
    },
    {
      name: "Energy & Others",
      symbols: [
        { name: "BSE:RELIANCE", displayName: "Reliance Industries" },
        { name: "BSE:BHARTIARTL", displayName: "Bharti Airtel" },
        { name: "BSE:ONGC", displayName: "ONGC" },
        { name: "BSE:ITC", displayName: "ITC Ltd." },
        { name: "BSE:LT", displayName: "Larsen & Toubro" },
      ],
    },
  ],
};

export const SYMBOL_INFO_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: 170,
});

export const CANDLE_CHART_WIDGET_CONFIG = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: true,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: "D",
  locale: "en",
  save_image: false,
  style: 1,
  symbol: symbol.toUpperCase(),
  theme: "dark",
  timezone: "Etc/UTC",
  backgroundColor: "#141414",
  gridColor: "#141414",
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: "100%",
  height: 600,
});

export const BASELINE_WIDGET_CONFIG = (symbol: string) => ({
  allow_symbol_change: false,
  calendar: false,
  details: false,
  hide_side_toolbar: true,
  hide_top_toolbar: false,
  hide_legend: false,
  hide_volume: false,
  hotlist: false,
  interval: "D",
  locale: "en",
  save_image: false,
  style: 10,
  symbol: symbol.toUpperCase(),
  theme: "dark",
  timezone: "Etc/UTC",
  backgroundColor: "#141414",
  gridColor: "#141414",
  watchlist: [],
  withdateranges: false,
  compareSymbols: [],
  studies: [],
  width: "100%",
  height: 600,
});

export const TECHNICAL_ANALYSIS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 400,
  interval: "1h",
  largeChartUrl: "",
});

export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: "true",
  locale: "en",
  width: "100%",
  height: 464,
  displayMode: "regular",
  largeChartUrl: "",
});

export const POPULAR_STOCK_SYMBOLS = [
  // Tech Giants (the big technology companies)
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
  "ORCL",
  "CRM",

  // Growing Tech Companies
  "ADBE",
  "INTC",
  "AMD",
  "PYPL",
  "UBER",
  "ZOOM",
  "SPOT",
  "SQ",
  "SHOP",
  "ROKU",

  // Newer Tech Companies
  "SNOW",
  "PLTR",
  "COIN",
  "RBLX",
  "DDOG",
  "CRWD",
  "NET",
  "OKTA",
  "TWLO",
  "ZM",

  // Consumer & Delivery Apps
  "DOCU",
  "PTON",
  "PINS",
  "SNAP",
  "LYFT",
  "DASH",
  "ABNB",
  "RIVN",
  "LCID",
  "NIO",

  // International Companies
  "XPEV",
  "LI",
  "BABA",
  "JD",
  "PDD",
  "TME",
  "BILI",
  "DIDI",
  "GRAB",
  "SE",
];

export const NO_MARKET_NEWS =
  '<p class="mobile-text" style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#4b5563;">No market news available today. Please check back tomorrow.</p>';

export const WATCHLIST_TABLE_HEADER = [
  "Company",
  "Symbol",
  "Price",
  "Change",
  "Market Cap",
  "P/E Ratio",
  "Alert",
  "Action",
];
