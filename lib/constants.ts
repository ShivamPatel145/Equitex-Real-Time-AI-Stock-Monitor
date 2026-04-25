export const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/search", label: "Search" },
  { href: "/watchlist", label: "Watchlist" },
];

export type DashboardStock = {
  symbol: string;
  company: string;
  exchange: "BSE" | "NSE";
  tradingViewSymbol: string;
  sector:
    | "Financial"
    | "Technology"
    | "Energy"
    | "Healthcare"
    | "Consumer"
    | "Industrial"
    | "Automotive"
    | "Telecom";
  price: number;
  changePercent: number;
  marketCapValue: number;
  marketCapLabel: string;
  peRatio: number;
};

export const WATCHLIST_STORAGE_KEY = "equitex.watchlist.symbols";

export const STOCK_SECTORS = [
  "All",
  "Financial",
  "Technology",
  "Energy",
  "Healthcare",
  "Consumer",
  "Industrial",
  "Automotive",
  "Telecom",
] as const;

export const DASHBOARD_STOCKS: DashboardStock[] = [
  {
    symbol: "RELIANCE",
    company: "Reliance Industries Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:RELIANCE",
    sector: "Energy",
    price: 2888.45,
    changePercent: 1.42,
    marketCapValue: 19.54,
    marketCapLabel: "INR 19.54T",
    peRatio: 27.8,
  },
  {
    symbol: "HDFCBANK",
    company: "HDFC Bank Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:HDFCBANK",
    sector: "Financial",
    price: 1679.2,
    changePercent: 0.84,
    marketCapValue: 12.73,
    marketCapLabel: "INR 12.73T",
    peRatio: 18.4,
  },
  {
    symbol: "ICICIBANK",
    company: "ICICI Bank Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:ICICIBANK",
    sector: "Financial",
    price: 1128.55,
    changePercent: 0.76,
    marketCapValue: 7.98,
    marketCapLabel: "INR 7.98T",
    peRatio: 17.2,
  },
  {
    symbol: "SBIN",
    company: "State Bank of India",
    exchange: "BSE",
    tradingViewSymbol: "BSE:SBIN",
    sector: "Financial",
    price: 812.4,
    changePercent: -0.64,
    marketCapValue: 7.24,
    marketCapLabel: "INR 7.24T",
    peRatio: 10.6,
  },
  {
    symbol: "TCS",
    company: "Tata Consultancy Services",
    exchange: "BSE",
    tradingViewSymbol: "BSE:TCS",
    sector: "Technology",
    price: 4094.6,
    changePercent: 1.18,
    marketCapValue: 14.82,
    marketCapLabel: "INR 14.82T",
    peRatio: 31.2,
  },
  {
    symbol: "INFY",
    company: "Infosys Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:INFY",
    sector: "Technology",
    price: 1598.7,
    changePercent: 0.93,
    marketCapValue: 6.61,
    marketCapLabel: "INR 6.61T",
    peRatio: 24.9,
  },
  {
    symbol: "HCLTECH",
    company: "HCL Technologies Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:HCLTECH",
    sector: "Technology",
    price: 1491.35,
    changePercent: -0.4,
    marketCapValue: 4.04,
    marketCapLabel: "INR 4.04T",
    peRatio: 22.1,
  },
  {
    symbol: "WIPRO",
    company: "Wipro Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:WIPRO",
    sector: "Technology",
    price: 507.35,
    changePercent: 0.22,
    marketCapValue: 2.66,
    marketCapLabel: "INR 2.66T",
    peRatio: 21.5,
  },
  {
    symbol: "BHARTIARTL",
    company: "Bharti Airtel Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:BHARTIARTL",
    sector: "Telecom",
    price: 1288.9,
    changePercent: 1.06,
    marketCapValue: 7.38,
    marketCapLabel: "INR 7.38T",
    peRatio: 64.8,
  },
  {
    symbol: "ITC",
    company: "ITC Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:ITC",
    sector: "Consumer",
    price: 431.25,
    changePercent: -0.27,
    marketCapValue: 5.39,
    marketCapLabel: "INR 5.39T",
    peRatio: 26.3,
  },
  {
    symbol: "HINDUNILVR",
    company: "Hindustan Unilever Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:HINDUNILVR",
    sector: "Consumer",
    price: 2472.5,
    changePercent: 0.12,
    marketCapValue: 5.82,
    marketCapLabel: "INR 5.82T",
    peRatio: 58.4,
  },
  {
    symbol: "LT",
    company: "Larsen and Toubro Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:LT",
    sector: "Industrial",
    price: 3654.95,
    changePercent: 0.68,
    marketCapValue: 5.03,
    marketCapLabel: "INR 5.03T",
    peRatio: 35.7,
  },
  {
    symbol: "NTPC",
    company: "NTPC Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:NTPC",
    sector: "Energy",
    price: 367.8,
    changePercent: 0.51,
    marketCapValue: 3.57,
    marketCapLabel: "INR 3.57T",
    peRatio: 17.9,
  },
  {
    symbol: "ONGC",
    company: "Oil and Natural Gas Corporation",
    exchange: "BSE",
    tradingViewSymbol: "BSE:ONGC",
    sector: "Energy",
    price: 275.4,
    changePercent: -1.24,
    marketCapValue: 3.47,
    marketCapLabel: "INR 3.47T",
    peRatio: 8.4,
  },
  {
    symbol: "SUNPHARMA",
    company: "Sun Pharmaceutical Industries",
    exchange: "BSE",
    tradingViewSymbol: "BSE:SUNPHARMA",
    sector: "Healthcare",
    price: 1732.35,
    changePercent: 1.91,
    marketCapValue: 4.15,
    marketCapLabel: "INR 4.15T",
    peRatio: 37.9,
  },
  {
    symbol: "CIPLA",
    company: "Cipla Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:CIPLA",
    sector: "Healthcare",
    price: 1472.1,
    changePercent: 0.59,
    marketCapValue: 1.19,
    marketCapLabel: "INR 1.19T",
    peRatio: 28.4,
  },
  {
    symbol: "TATAMOTORS",
    company: "Tata Motors Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:TATAMOTORS",
    sector: "Automotive",
    price: 1007.8,
    changePercent: -0.82,
    marketCapValue: 3.61,
    marketCapLabel: "INR 3.61T",
    peRatio: 12.7,
  },
  {
    symbol: "MARUTI",
    company: "Maruti Suzuki India Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:MARUTI",
    sector: "Automotive",
    price: 12610,
    changePercent: 0.44,
    marketCapValue: 3.97,
    marketCapLabel: "INR 3.97T",
    peRatio: 29.3,
  },
  {
    symbol: "M&M",
    company: "Mahindra and Mahindra Ltd.",
    exchange: "BSE",
    tradingViewSymbol: "BSE:M&M",
    sector: "Automotive",
    price: 2339.2,
    changePercent: 1.07,
    marketCapValue: 2.91,
    marketCapLabel: "INR 2.91T",
    peRatio: 26.1,
  },
];

export const DASHBOARD_STOCKS_BY_SYMBOL: ReadonlyMap<string, DashboardStock> =
  new Map(DASHBOARD_STOCKS.map((stock) => [stock.symbol, stock] as const));

export const DASHBOARD_STOCK_SYMBOLS_SET: ReadonlySet<string> = new Set(
  DASHBOARD_STOCKS.map((stock) => stock.symbol),
);

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
  colorTheme: "dark",
  dataSource: "SENSEX",
  market: "india",
  blockSize: "market_cap_basic",
  blockColor: "change",
  grouping: "sector",
  isTransparent: true,
  locale: "en",
  symbolUrl: "",
  exchanges: ["BSE", "NSE"],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: "100%",
  height: "600",
};

export const HOTLISTS_WIDGET_CONFIG = {
  colorTheme: "dark",
  dateRange: "12M",
  exchange: "BSE",
  showAndHideCards: true,
  noTimeScale: false,
  isTransparent: true,
  displayMode: "regular",
  width: "100%",
  height: "600",
  locale: "en",
};

export const TICKER_TAPE_WIDGET_CONFIG = {
  symbols: [
    {
      proName: "BSE:SENSEX",
      title: "BSE SENSEX",
    },
    {
      proName: "FOREXCOM:SPXUSD",
      title: "S&P 500",
    },
    {
      proName: "FOREXCOM:NSXUSD",
      title: "US 100",
    },
    {
      proName: "FX_IDC:INRUSD",
      title: "INR/USD",
    },
    {
      proName: "TVC:GOLD",
      title: "Gold",
    },
    {
      proName: "TVC:USOIL",
      title: "Crude Oil",
    },
  ],
  showSymbolLogo: true,
  isTransparent: true,
  displayMode: "adaptive",
  colorTheme: "dark",
  locale: "en",
};

export const TIMELINE_WIDGET_CONFIG = {
  feedMode: "all_symbols",
  isTransparent: true,
  displayMode: "regular",
  width: "100%",
  height: 550,
  colorTheme: "dark",
  locale: "en",
};

export const EVENTS_WIDGET_CONFIG = {
  colorTheme: "dark",
  isTransparent: true,
  width: "100%",
  height: 550,
  locale: "en",
  importanceFilter: "-1,0,1",
  currencyFilter: "INR,USD",
};

export const SCREENER_WIDGET_CONFIG = {
  width: "100%",
  height: "700",
  defaultColumn: "overview",
  defaultScreen: "general",
  market: "india",
  showToolbar: true,
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
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
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: 400,
  interval: "1h",
  largeChartUrl: "",
});

export const COMPANY_PROFILE_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: 440,
});

export const COMPANY_FINANCIALS_WIDGET_CONFIG = (symbol: string) => ({
  symbol: symbol.toUpperCase(),
  colorTheme: "dark",
  isTransparent: true,
  locale: "en",
  width: "100%",
  height: 464,
  displayMode: "regular",
  largeChartUrl: "",
});

export const POPULAR_STOCK_SYMBOLS = [
  // Top Market Cap Companies
  "RELIANCE",
  "TCS",
  "HDFCBANK",
  "ICICIBANK",
  "BHARTIARTL",
  "SBIN",
  "INFY",
  "LICI",
  "ITC",
  "HINDUNILVR",

  // Finance & Banking
  "KOTAKBANK",
  "AXISBANK",
  "BAJFINANCE",
  "BAJAJFINSV",
  "CHOLAFIN",
  "PNB",
  "INDUSINDBK",
  "BOB",
  "BANKBARODA",
  "CANBK",

  // IT & Tech
  "HCLTECH",
  "WIPRO",
  "TECHM",
  "LTIM",
  "PERSISTENT",
  "MPHASIS",
  "COFORGE",
  "TATAELXSI",
  "KPITTECH",
  "CYIENT",

  // Auto & Manufacturing
  "TATAMOTORS",
  "M&M",
  "MARUTI",
  "BAJAJ-AUTO",
  "HEROMOTOCO",
  "EICHERMOT",
  "TVSMOTOR",
  "ASHOKLEY",
  "BOSCHLTD",
  "MRF",

  // Energy, Infra & Others
  "LT",
  "NTPC",
  "POWERGRID",
  "ONGC",
  "COALINDIA",
  "ADANIENT",
  "ADANIPORTS",
  "SUNPHARMA",
  "CIPLA",
  "TATASTEEL",
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
