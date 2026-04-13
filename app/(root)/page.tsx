import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  HOTLISTS_WIDGET_CONFIG,
  TICKER_TAPE_WIDGET_CONFIG,
  SCREENER_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="flex flex-col min-h-screen w-full gap-8">
      {/* Ticker Tape */}
      <section className="w-full pt-4">
        <TradingViewWidget
          scriptUrl={`${scriptUrl}ticker-tape.js`}
          config={TICKER_TAPE_WIDGET_CONFIG}
          height={70}
        />
      </section>

      <div className="flex w-full home-wrapper gap-8">
        <section className="grid w-full gap-8 home-section">
          <div className="md:col-span-1 xl:col-span-1 border border-gray-700/50 rounded-2xl bg-[#0a0a0a] p-4 shadow-xl">
            <TradingViewWidget
              title="Market Overview"
              scriptUrl={`${scriptUrl}market-overview.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              className="custom-chart"
              height={600}
            />
          </div>
          <div className="md:col-span-1 xl:col-span-2 border border-gray-700/50 rounded-2xl bg-[#0a0a0a] p-4 shadow-xl overflow-hidden">
            <TradingViewWidget
              title="Stock Heatmap"
              scriptUrl={`${scriptUrl}stock-heatmap.js`}
              config={HEATMAP_WIDGET_CONFIG}
              height={600}
            />
          </div>
        </section>

        <section className="grid w-full gap-8 home-section">
          <div className="h-full md:col-span-1 xl:col-span-1 border border-gray-700/50 rounded-2xl bg-[#0a0a0a] p-4 shadow-xl overflow-hidden">
            <TradingViewWidget
              title="Market Movers"
              scriptUrl={`${scriptUrl}hotlists.js`}
              config={HOTLISTS_WIDGET_CONFIG}
              height={600}
            />
          </div>
          <div className="h-full md:col-span-1 xl:col-span-2 border border-gray-700/50 rounded-2xl bg-[#0a0a0a] p-4 shadow-xl overflow-hidden">
            <TradingViewWidget
              scriptUrl={`${scriptUrl}market-quotes.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              height={600}
            />
          </div>
        </section>

        {/* Stock Screener */}
        <section className="w-full border border-gray-700/50 rounded-2xl bg-[#0a0a0a] shadow-xl mt-4 mb-10 overflow-hidden">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}screener.js`}
            config={SCREENER_WIDGET_CONFIG}
            height={700}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
