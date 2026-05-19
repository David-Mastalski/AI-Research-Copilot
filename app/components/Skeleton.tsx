export function Skeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-pulse text-sm">
      <div className="flex justify-between items-center px-2">
        <div className="h-5 w-48 rounded bg-white/5" />
        <div className="h-4 w-28 rounded bg-white/5" />
      </div>

      <div className="rounded-xl border border-indigo-950/40 bg-zinc-950/50 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-indigo-500/20" />
          <div className="h-4 w-24 rounded bg-indigo-500/10" />
        </div>
        <div className="space-y-2.5 pt-2">
          <div className="h-4 w-full rounded bg-white/5" />
          <div className="h-4 w-full rounded bg-white/5" />
          <div className="h-4 w-4/5 rounded bg-white/5" />
        </div>
      </div>

      <div className="rounded-xl border border-indigo-950/40 bg-zinc-950/50 p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-indigo-500/20" />
            <div className="h-4 w-28 rounded bg-indigo-500/10" />
          </div>
          <div className="h-5 w-5 rounded-full bg-indigo-500/5" />
        </div>

        <div className="space-y-4 pt-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="h-5 w-5 rounded bg-indigo-500/10 shrink-0 mt-0.5" />
              <div className="w-full space-y-2">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-2/3 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-950/30 bg-zinc-950/50 p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-amber-500/20" />
            <div className="h-4 w-20 rounded bg-amber-500/10" />
          </div>
          <div className="h-5 w-5 rounded-full bg-amber-500/5" />
        </div>

        <div className="space-y-5 pt-2">
          {[1, 2].map((item) => (
            <div key={item} className="flex items-start gap-4">
              <div className="h-4 w-4 rounded-full bg-amber-500/10 shrink-0 mt-1" />
              <div className="w-full space-y-2">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-9 w-full rounded-xl bg-white/5 mt-2" />
    </div>
  );
}
