import { brl, getBundle, type BundleId } from "@/lib/bundles";

export function MobileStickyCta({
  selected,
  checkoutUrl,
}: {
  selected: BundleId;
  checkoutUrl: string;
}) {
  const bundle = getBundle(selected);

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(13,13,13,0.1)] bg-white/95 backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-4 max-w-lg mx-auto">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--ink)]/50 truncate">
            {bundle.name}
          </div>
          <div className="font-display text-2xl leading-none">{brl(bundle.price)}</div>
        </div>
        <a
          href={checkoutUrl}
          className="shrink-0 bg-[var(--primary)] text-white px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] rounded-xl"
        >
          Começar
        </a>
      </div>
    </div>
  );
}
