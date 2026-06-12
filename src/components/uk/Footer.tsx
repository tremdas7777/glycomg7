import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, Droplets, Mail, Package, ShieldCheck, Smartphone, Truck } from "lucide-react";
import logo from "@/assets/uk/aidex-logo.png";
import { ukBrand } from "@/lib/locale/uk/brand";
import { UK_FREE_DELIVERY_LABEL } from "@/lib/locale/uk/bundles";
import { ukPaths } from "@/lib/locale/uk/paths";

const productLinks = [
  { label: "AiDEX G7", to: ukPaths.product },
  { label: "Plans", href: `${ukPaths.home}#plans` },
  { label: "How it works", href: `${ukPaths.home}#technology` },
  { label: "Specifications", to: ukPaths.product },
] as const;

const supportLinks = [
  { label: "FAQ", to: ukPaths.faq },
  { label: "Track delivery", to: ukPaths.tracking },
  { label: "Contact", to: ukPaths.contact },
  { label: "About us", to: ukPaths.about },
] as const;

const legalLinks = [
  { label: "Delivery", to: ukPaths.shipping },
  { label: "Privacy", to: ukPaths.privacy },
  { label: "Refunds", to: ukPaths.refund },
] as const;

const highlights = [
  { Icon: Truck, label: "Free UK delivery" },
  { Icon: Activity, label: "24h monitoring" },
  { Icon: Smartphone, label: "App in English" },
  { Icon: Droplets, label: "IP68" },
  { Icon: ShieldCheck, label: "SSL secure" },
  { Icon: Package, label: "Order tracking" },
] as const;

function FooterLink({ item }: { item: { label: string; to?: string; href?: string } }) {
  const className = "text-sm text-white/65 hover:text-[var(--primary)] transition-colors";
  if ("to" in item && item.to) {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className}>
      {item.label}
    </a>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
        {title}
      </h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

export function UkFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="border-b border-white/10 bg-[var(--primary-deep)]">
        <div className="container-edge py-6 md:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-display text-xl md:text-2xl leading-tight text-balance">
            Continuous glucose monitoring in real time.
          </p>
          <Link
            to={ukPaths.product}
            className="inline-flex shrink-0 items-center justify-center bg-[var(--primary)] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] rounded-xl hover:opacity-90"
          >
            View plans
          </Link>
        </div>
      </div>

      <div className="container-edge py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8">
          <div className="col-span-2 md:col-span-4">
            <Link to={ukPaths.home} aria-label="AiDEX — home" className="inline-block group">
              <span className="inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] ring-1 ring-white/15 transition-transform group-hover:scale-[1.01]">
                <img
                  src={logo}
                  alt="AiDEX G7"
                  className="h-9 w-auto max-w-[11rem] md:h-10 md:max-w-[12rem] object-contain object-left"
                  loading="lazy"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/60 leading-relaxed">
              {ukBrand.productName} · {ukBrand.tagline}. {ukBrand.manufacturer}.
            </p>
            <a
              href={`mailto:${ukBrand.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/75 hover:text-[var(--primary)]"
            >
              <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
              {ukBrand.email}
            </a>
          </div>

          <div className="col-span-1 md:col-span-2">
            <FooterColumn title="Product">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="col-span-1 md:col-span-2">
            <FooterColumn title="Support">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </FooterColumn>
          </div>

          <div className="col-span-2 md:col-span-4">
            <FooterColumn title="Legal">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </FooterColumn>
            <p className="mt-4 text-[10px] leading-relaxed text-white/35 md:max-w-xs">
              CGM device. Consult your healthcare professional. {UK_FREE_DELIVERY_LABEL}.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-x-5 gap-y-2">
          {highlights.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-[10px] text-white/50"
            >
              <Icon className="w-3.5 h-3.5 text-[var(--primary)]" strokeWidth={1.5} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-edge py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-white/40">
          <span>
            © {year} {ukBrand.name} · {ukBrand.manufacturer}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to={ukPaths.privacy} className="hover:text-[var(--primary)]">
              Privacy
            </Link>
            <Link to={ukPaths.shipping} className="hover:text-[var(--primary)]">
              Delivery
            </Link>
            <Link to={ukPaths.contact} className="hover:text-[var(--primary)]">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
