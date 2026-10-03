import { Check } from "lucide-react";
import { ORDER_BUMP } from "@/lib/order-bump";
import { cn } from "@/lib/utils";
import { brl } from "./parts";

const BENEFITS = [
  "Encaixa no lugar da tampa da sua caneta de insulina ou GLP-1",
  "Mantém o medicamento na temperatura segura 24h — sem gelo, pilha ou geladeira",
  "Luz verde mostra na hora que a insulina está protegida",
  "Liberado para avião: leve para praia, academia ou carro no sol",
];

const off = Math.round((1 - ORDER_BUMP.price / ORDER_BUMP.compareAt) * 100);

/** Oferta adicional (order bump) logo acima do botão de finalizar. */
export function OrderBump({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border-2 border-dashed transition-colors",
        checked
          ? "border-[var(--ck-ok)] bg-[var(--ck-ok)]/[0.04]"
          : "border-amber-400 bg-amber-50/60",
      )}
    >
      <div className="bg-amber-400 px-4 py-1.5 text-center text-[12px] font-bold uppercase tracking-wide text-amber-950">
        Oferta exclusiva — só aparece nesta tela
      </div>

      <div className="p-4">
        <p className="text-[14px] font-semibold leading-snug">
          Você vai acompanhar sua glicose com o G7. Mas e a sua insulina, está protegida?
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Insulina e canetas de GLP-1 perdem efeito no calor{" "}
          <b className="text-foreground">sem mudar de aparência</b>. O resultado aparece depois,
          como picos de glicose sem explicação no seu monitor. O{" "}
          <b className="text-foreground">{ORDER_BUMP.name}</b> é uma tampa térmica que substitui a
          tampa da caneta e protege o medicamento onde você estiver.
        </p>

        <div className="mt-4 flex gap-4">
          <img
            src={ORDER_BUMP.img}
            alt={ORDER_BUMP.fullName}
            width={88}
            height={88}
            loading="lazy"
            className="h-[88px] w-[88px] shrink-0 rounded-md border border-border bg-white object-contain"
          />
          <ul className="space-y-1.5 text-[12.5px] leading-snug">
            {BENEFITS.map((b) => (
              <li key={b} className="flex gap-1.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ck-ok)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[13px] text-muted-foreground line-through">
            {brl(ORDER_BUMP.compareAt)}
          </span>
          <span className="text-[20px] font-bold text-[var(--ck-ok)]">{brl(ORDER_BUMP.price)}</span>
          <span className="rounded bg-[var(--ck-badge)] px-1.5 py-0.5 text-[11px] font-bold text-[var(--ck-ok)]">
            {off}% OFF
          </span>
          <span className="w-full text-[12px] text-muted-foreground">
            Vai na mesma caixa do seu G7 — sem frete extra.
          </span>
        </div>

        <label
          className={cn(
            "mt-4 flex cursor-pointer items-center gap-3 rounded-md border-2 px-3 py-3 transition-colors",
            checked
              ? "border-[var(--ck-ok)] bg-white"
              : "border-amber-400 bg-white animate-pulse [animation-duration:2.5s]",
          )}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 shrink-0 accent-[var(--ck-ok)]"
          />
          <span className="text-[13.5px] font-semibold leading-snug">
            {checked
              ? `Adicionado! ${ORDER_BUMP.name} incluído no seu pedido.`
              : `Sim! Quero proteger minha insulina por + ${brl(ORDER_BUMP.price)}`}
          </span>
        </label>
      </div>
    </div>
  );
}
