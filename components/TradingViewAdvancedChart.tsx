"use client";

import React, { useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";

interface TradingViewAdvancedChartProps {
  symbol: string;
  theme?: "light" | "dark";
  height?: number | string;
  className?: string;
}

const TradingViewAdvancedChart = ({
  symbol,
  theme = "dark",
  height = 600,
  className,
}: TradingViewAdvancedChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // If we already have the script, we can just initialize
    if (document.getElementById("tradingview-widget-script")) {
      initWidget();
      return;
    }

    // Otherwise load the script
    const script = document.createElement("script");
    script.id = "tradingview-widget-script";
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);

    function initWidget() {
      if (typeof window !== "undefined" && (window as any).TradingView && containerRef.current) {
        // Clear previous widget if exists
        containerRef.current.innerHTML = "";
        
        widgetRef.current = new (window as any).TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Asia/Kolkata",
          theme: theme,
          style: "1",
          locale: "in",
          enable_publishing: false,
          backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
          gridColor: theme === "dark" ? "#1f2937" : "#e5e7eb",
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: containerRef.current.id,
          allow_symbol_change: true,
        });
      }
    }

    return () => {
      // Cleanup if needed
      if (widgetRef.current && widgetRef.current.remove) {
        widgetRef.current.remove();
      }
    };
  }, [symbol, theme]);

  return (
    <div
      className={cn("tradingview-widget-container", className)}
      style={{ height, width: "100%" }}
    >
      <div
        id={`tv-widget-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`}
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default memo(TradingViewAdvancedChart);
