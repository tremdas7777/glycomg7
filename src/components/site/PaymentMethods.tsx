type PaymentMethodsProps = {
  className?: string;
  showTitle?: boolean;
  compact?: boolean;
};

const cards = [
  { id: "visa", label: "Visa", bg: "#1A1F71", fg: "#ffffff" },
  { id: "mastercard", label: "Mastercard", bg: "#EB001B", fg: "#ffffff" },
  { id: "elo", label: "Elo", bg: "#000000", fg: "#FFCB05" },
  { id: "amex", label: "Amex", bg: "#006FCF", fg: "#ffffff" },
  { id: "hipercard", label: "Hipercard", bg: "#B3131B", fg: "#ffffff" },
] as const;

function PixBadge({ compact }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center font-bold uppercase tracking-[0.12em] bg-[#32BCAD] text-white ${
        compact ? "h-7 min-w-[3.25rem] px-2.5 text-[9px] rounded-md" : "h-8 min-w-[3.75rem] px-3 text-[10px] rounded-lg"
      }`}
    >
      Pix
    </span>
  );
}

function CardBadge({
  label,
  bg,
  fg,
  compact,
}: {
  label: string;
  bg: string;
  fg: string;
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-bold uppercase tracking-[0.08em] ${
        compact ? "h-7 min-w-[3.25rem] px-2 text-[8px] rounded-md" : "h-8 min-w-[3.75rem] px-2.5 text-[9px] rounded-lg"
      }`}
      style={{ backgroundColor: bg, color: fg }}
    >
      {label}
    </span>
  );
}

export function PaymentMethods({ className = "", showTitle = true, compact = false }: PaymentMethodsProps) {
  return (
    <div className={className}>
      {showTitle && (
        <p
          className={`font-bold uppercase tracking-[0.18em] text-[var(--ink)]/50 ${
            compact ? "text-[9px] mb-2.5" : "text-[10px] mb-4"
          }`}
        >
          Formas de pagamento
        </p>
      )}
      <div className={`flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"}`}>
        <PixBadge compact={compact} />
        {cards.map((card) => (
          <CardBadge key={card.id} {...card} compact={compact} />
        ))}
      </div>
      {!compact && (
        <p className="mt-3 text-xs text-[var(--ink)]/55 leading-relaxed">
          Pix com aprovação imediata · Cartão em até 12x sem juros
        </p>
      )}
    </div>
  );
}
