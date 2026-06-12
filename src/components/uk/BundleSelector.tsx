import { ukBundles, gbp, UK_SENSOR_DAYS, type UkBundleId } from "@/lib/locale/uk/bundles";

export function UkBundleSelector({
  selected,
  onSelect,
}: {
  selected: UkBundleId;
  onSelect: (id: UkBundleId) => void;
}) {
  return (
    <div className="space-y-3">
      {ukBundles.map((b) => {
        const active = b.id === selected;
        const unitWord = b.months === 1 ? "unit" : "units";
        const label = (
          <>
            <strong className="font-semibold">
              {b.months} {unitWord} = {b.sensors} sensors
            </strong>{" "}
            <span className={active ? "text-white/85" : "text-[var(--ink)]/55"}>
              ({UK_SENSOR_DAYS} days per sensor) ({b.monitoringDays} days total)
            </span>
          </>
        );
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => onSelect(b.id)}
            aria-pressed={active}
            className={`relative w-full text-left rounded-full px-5 md:px-6 py-4 md:py-4 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
              ${
                active
                  ? "bg-[var(--primary)] text-white border border-[var(--primary)] shadow-[0_10px_30px_-12px_rgba(101,163,13,0.5)]"
                  : "bg-white text-[var(--ink)] border border-[rgba(13,13,13,0.12)] hover:border-[var(--primary)]/50"
              }`}
          >
            {b.badge && (
              <span
                className={`absolute -top-2.5 left-5 text-[9px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full ${
                  active ? "bg-white text-[var(--primary)]" : "bg-[var(--primary)] text-white"
                }`}
              >
                {b.badge}
              </span>
            )}

            <div className="flex items-center justify-between gap-4">
              <div className="text-[13px] md:text-sm leading-snug min-w-0">{label}</div>
              <div className="text-right shrink-0">
                <div
                  className={`text-sm md:text-base font-bold whitespace-nowrap ${
                    active ? "text-white" : "text-[var(--ink)]"
                  }`}
                >
                  {gbp(b.price)}
                </div>
                {b.compareAtPrice && (
                  <div
                    className={`text-[10px] line-through ${
                      active ? "text-white/60" : "text-[var(--ink)]/40"
                    }`}
                  >
                    {gbp(b.compareAtPrice)}
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
