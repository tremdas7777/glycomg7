import type { ReactNode, InputHTMLAttributes } from "react";
import { Check, Lock, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const PIX_ICON = "https://assetsglobalbr.com/u/checkout/27a27eb6.avif";
export const PRODUCT_IMG = "https://cdn.shopify.com/s/files/1/0785/6436/0391/files/aidex-prod-kit.png?v=1779673273";

export function Card({ children, done, muted, className }: { children: ReactNode; done?: boolean; muted?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-5 md:p-[26px]",
        done ? "border-[var(--ck-ok)] bg-[var(--ck-ok)]/[0.03]" : muted ? "border-transparent bg-muted/60" : "border-border bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHead({ title, step, onEdit, sub, muted }: { title: string; step?: string; onEdit?: () => void; sub?: string; muted?: boolean }) {
  return (
    <div className="mb-1">
      <div className="flex items-center justify-between">
        <h2 className={cn("text-lg font-medium", muted && "text-muted-foreground")}>{title}</h2>
        {onEdit ? (
          <button type="button" onClick={onEdit} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            Editar <SquarePen className="h-4 w-4" />
          </button>
        ) : (
          step && <span className={cn("text-xs", muted && "text-muted-foreground")}>{step}</span>
        )}
      </div>
      {sub && <p className={cn("mt-1 text-[13px]", muted && "text-muted-foreground")}>{sub}</p>}
    </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; ok?: boolean; prefix?: string; wrap?: string };
export function Field({ label, ok, prefix, wrap, className, ...rest }: FieldProps) {
  const filled = Boolean(rest.value);
  return (
    <label className={cn("block", wrap)}>
      <span className="mb-2 block text-[13px] font-medium">{label}</span>
      <span className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-sm text-muted-foreground">{prefix}</span>}
        <input
          {...rest}
          className={cn(
            "h-[46px] w-full rounded-lg border px-3 text-[13px] outline-none focus-visible:border-foreground focus-visible:ring-1 focus-visible:ring-foreground",
            filled ? "border-[var(--ck-blue)]/20 bg-[var(--ck-field)]" : "border-border bg-background",
            prefix && "pl-12",
            className,
          )}
        />
        {ok && <Check className="absolute right-3 h-4 w-4 text-[var(--ck-ok)]" />}
      </span>
    </label>
  );
}

export function GreenButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[var(--ck-green)] text-base font-semibold text-primary-foreground hover:brightness-95 disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function CheckoutFooter() {
  return (
    <footer className="mt-auto bg-[var(--ck-footer)] px-4 py-8 text-center text-[13px] text-primary-foreground">
      <p className="font-medium">AIDEX | Todos os direitos reservados</p>
      <p className="mt-2">© {new Date().getFullYear()} · CNPJ: {brand.cnpj} · E-mail: {brand.email}</p>
      <p className="mt-3 text-sm">Formas de pagamento:</p>
      <div className="mt-2 flex justify-center gap-2">
        {["Master", "VISA", "AMEX"].map((b) => (
          <span key={b} className="flex h-6 w-9 items-center justify-center rounded-sm bg-background text-[8px] font-bold text-foreground">{b}</span>
        ))}
        <span className="flex h-6 w-9 items-center justify-center rounded-sm bg-background">
          <img src={PIX_ICON} alt="Pix" className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2">
        <Lock className="h-5 w-5" />
        <span className="text-left text-xs leading-tight"><b>PAGAMENTO</b><br />100% SEGURO</span>
      </div>
    </footer>
  );
}
