export default function Loading() {
  return (
    <div className="flex w-full min-h-screen flex-col gap-5 pb-10 bg-[#020202] px-4 md:px-6 lg:px-8 pt-5 animate-pulse">
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(15,237,190,0.05),transparent)] -z-10" />

      {/* Ticker tape */}
      <div className="w-full h-[50px] rounded-2xl border border-gray-800/60 bg-[#090909]" />

      {/* Hero header */}
      <div className="rounded-2xl border border-gray-800/60 bg-[#090909] px-6 py-5 h-[120px]">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 h-full">
          <div className="flex gap-5 items-center">
            <div>
              <div className="h-7 w-36 bg-gray-800 rounded-lg mb-2" />
              <div className="h-3 w-52 bg-gray-800/60 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-32 bg-gray-700/40 rounded-xl" />
              <div className="h-9 w-32 bg-gray-800/40 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 xl:flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[72px] w-[148px] rounded-xl border border-gray-800/60 bg-[#0d0d0d]" />
            ))}
          </div>
        </div>
      </div>

      {/* Main chart + movers */}
      <div className="grid w-full gap-4 xl:grid-cols-4">
        <div className="xl:col-span-3 h-[594px] rounded-2xl border border-gray-800/60 bg-[#090909]">
          <div className="px-4 pt-4"><div className="h-3 w-44 bg-gray-800 rounded mb-3" /></div>
          <div className="mx-4 h-[530px] bg-gray-900/30 rounded-xl" />
        </div>
        <div className="xl:col-span-1 h-[594px] rounded-2xl border border-gray-800/60 bg-[#090909]">
          <div className="px-4 pt-4"><div className="h-3 w-28 bg-gray-800 rounded mb-3" /></div>
          <div className="flex flex-col gap-3 px-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-800/50 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Technical row */}
      <div className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[504px] rounded-2xl border border-gray-800/60 bg-[#090909]">
            <div className="px-4 pt-4"><div className="h-3 w-32 bg-gray-800 rounded mb-3" /></div>
            <div className="mx-4 h-[440px] bg-gray-900/30 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Heatmap + News */}
      <div className="grid w-full gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2 h-[624px] rounded-2xl border border-gray-800/60 bg-[#090909]">
          <div className="px-4 pt-4"><div className="h-3 w-40 bg-gray-800 rounded mb-3" /></div>
          <div className="mx-4 h-[560px] bg-gray-900/30 rounded-xl" />
        </div>
        <div className="h-[624px] rounded-2xl border border-gray-800/60 bg-[#090909]">
          <div className="px-4 pt-4"><div className="h-3 w-32 bg-gray-800 rounded mb-3" /></div>
          <div className="flex flex-col gap-3 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-800/50 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Screener */}
      <div className="h-[1064px] rounded-2xl border border-gray-800/60 bg-[#090909]">
        <div className="px-4 pt-4"><div className="h-3 w-44 bg-gray-800 rounded mb-3" /></div>
        <div className="mx-4 h-[1000px] bg-gray-900/30 rounded-xl" />
      </div>
    </div>
  );
}
