import { bundles, brl, bundleDurationLabel, type BundleId } from "@/lib/bundles";

export function BundleSelector({
  selected,
  onSelect,
}: {
  selected: BundleId;
  onSelect: (id: BundleId) => void;
}) {
  return (
    <div className="space-y-3">
      {bundles.map((b) => {
        const active = b.id === selected;
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => onSelect(b.id)}
            aria-pressed={active}
            className={`relative w-full text-left bg-white p-5 md:p-6 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
              ${
                active
                  ? "border border-[var(--primary)] shadow-[0_0_0_3px_rgba(132,204,22,0.15),0_10px_40px_-15px_rgba(101,163,13,0.35)]"
                  : "border border-[rgba(13,13,13,0.12)] hover:border-[var(--ink)]/40"
              }
              ${b.featured ? "md:scale-[1.015]" : ""}`}
          >
            {b.badge && (
              <span className="absolute -top-2.5 left-5 bg-[var(--primary)] text-white text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full">
                {b.badge}
              </span>
            )}

            <div className="flex items-start gap-4">
              {/* Radio */}
              <span
                className={`mt-1.5 shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                  ${active ? "border-[var(--primary)]" : "border-[var(--ink)]/30"}`}
              >
                <span
                  className={`block w-2 h-2 rounded-full bg-[var(--primary)] transition-transform duration-200 ${
                    active ? "scale-100" : "scale-0"
                  }`}
                />
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm md:text-base font-semibold tracking-tight text-[var(--ink)]">
                      {b.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/50 mt-1">
                      {bundleDurationLabel(b)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display text-2xl md:text-3xl leading-none text-[var(--ink)]">
                      {brl(b.price)}
                    </div>
                    {b.originalPrice && (
                      <div className="text-[11px] text-[var(--ink)]/40 line-through mt-1">
                        {brl(b.originalPrice)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-[11px]">
                  <span className="text-[var(--ink)]/55">
                    ou {b.installment}
                  </span>
                  {b.savings && (
                    <span className="text-[var(--primary)] font-semibold uppercase tracking-[0.12em] text-[10px]">
                      {b.savings}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
