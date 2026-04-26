"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#000000] px-4 text-center relative overflow-hidden">
      {/* Ambient red glow for error state */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-[800px] bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.1),transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>

        {/* Logo pill */}
        <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-[#0a0a0a] px-4 py-2">
          <LayoutDashboard className="h-4 w-4 text-teal-400" />
          <span className="text-sm font-bold text-gray-300 tracking-wide">EQUITEX</span>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Data Stream Interrupted</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            An error occurred while connecting to market data sources. This is usually temporary — please try refreshing.
          </p>
        </div>

        {/* Error detail */}
        {error.message && (
          <div className="w-full rounded-xl border border-gray-800 bg-[#0a0a0a] px-4 py-3 text-left">
            <p className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">Error Detail</p>
            <p className="text-xs font-mono text-red-400/80 break-all">{error.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-gray-950 hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
          >
            <RefreshCw className="h-4 w-4" />
            Reconnect
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-[#0a0a0a] px-6 py-3 text-sm font-bold text-gray-300 hover:border-gray-600 hover:text-gray-100 transition-colors"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}
