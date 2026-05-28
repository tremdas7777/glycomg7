import { brand } from "@/lib/brand";
import { buildShopifyCheckoutUrl } from "@/lib/shopify";

/** Plano de monitoramento em dias (30 / 60 / 90) */
export type BundleId = "30" | "60" | "90";

export const SENSOR_DAYS = brand.sensorDays;
export const SENSORS_PER_MONTH = brand.sensorsPerMonth;
export const FREE_SHIPPING_LABEL = "Frete grátis para todo o Brasil";

const LEGACY_IDS: Record<string, BundleId> = {
  "1": "30",
  "2": "60",
  "3": "90",
};

export type Bundle = {
  id: BundleId;
  name: string;
  months: number;
  sensors: number;
  monitoringDays: number;
  price: number;
  compareAtPrice?: number;
  installment: string;
  dailyCostLabel: string;
  description: string;
  checkoutProductName: string;
  checkoutProductDescription: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
  savings?: string;
};

export const bundles: Bundle[] = [
  {
    id: "30",
    name: "1 Mês de Monitoramento",
    months: 1,
    sensors: 2,
    monitoringDays: 30,
    price: 267,
    installment: "12x de R$26,70",
    dailyCostLabel: "Menos de R$9 por dia",
    description: "2 sensores CGM · 30 dias de monitoramento contínuo",
    checkoutProductName: `${brand.productName} — 1 Mês · 2 Sensores · 30 dias`,
    checkoutProductDescription:
      `${brand.productName}: monitoramento contínuo de glicose por 30 dias com 2 sensores CGM (${SENSOR_DAYS} dias cada). Leituras automáticas em tempo real, alertas inteligentes, app em português, relatórios AGP. Sem calibração. Resistente à água IP68. ${FREE_SHIPPING_LABEL}.`,
    checkoutUrl: buildShopifyCheckoutUrl("46594001404103"),
  },
  {
    id: "60",
    name: "2 Meses de Monitoramento",
    months: 2,
    sensors: 4,
    monitoringDays: 60,
    price: 1097,
    compareAtPrice: 1194,
    installment: "12x de R$109,70",
    dailyCostLabel: "Melhor valor mensal",
    description: "4 sensores CGM · 60 dias de monitoramento contínuo",
    checkoutProductName: `${brand.productName} — 2 Meses · 4 Sensores · 60 dias`,
    checkoutProductDescription:
      `${brand.productName}: 60 dias de acompanhamento glicêmico com 4 sensores CGM. Tecnologia em tempo real, alertas de hipo e hiperglicemia, app completo em português. ${FREE_SHIPPING_LABEL}. Melhor custo-benefício entre os planos mensais.`,
    checkoutUrl: buildShopifyCheckoutUrl("46594001436871"),
    featured: true,
    badge: "Mais vendido",
    savings: "Economize R$97",
  },
  {
    id: "90",
    name: "3 Meses de Monitoramento",
    months: 3,
    sensors: 6,
    monitoringDays: 90,
    price: 1497,
    compareAtPrice: 1791,
    installment: "12x de R$149,70",
    dailyCostLabel: "Maior economia por sensor",
    description: "6 sensores CGM · 90 dias de monitoramento contínuo",
    checkoutProductName: `${brand.productName} — 3 Meses · 6 Sensores · 90 dias`,
    checkoutProductDescription:
      `${brand.productName}: 90 dias de monitoramento contínuo com 6 sensores CGM. Máxima economia por sensor, dados 24h no celular, saúde metabólica inteligente. ${FREE_SHIPPING_LABEL}.`,
    checkoutUrl: buildShopifyCheckoutUrl("46594001469639"),
    badge: "Melhor custo-benefício",
    savings: "Economize R$294",
  },
];

export function parseBundleId(raw: string | undefined): BundleId | undefined {
  if (!raw) return undefined;
  if (raw === "30" || raw === "60" || raw === "90") return raw;
  return LEGACY_IDS[raw];
}

export function getBundle(id: string | undefined): Bundle {
  const parsed = parseBundleId(id);
  return bundles.find((b) => b.id === parsed) ?? bundles[1];
}

export function getCheckoutUrl(id: string | undefined) {
  return getBundle(id).checkoutUrl;
}

/** Próximo plano para upsell (30→60, 60→90) */
export function getUpgradeBundle(current: Bundle): Bundle | null {
  if (current.id === "30") return bundles.find((b) => b.id === "60") ?? null;
  if (current.id === "60") return bundles.find((b) => b.id === "90") ?? null;
  return null;
}

export function bundleDurationLabel(bundle: Bundle) {
  return `${bundle.sensors} sensores CGM · ${bundle.monitoringDays} dias de monitoramento`;
}

export function bundleMonitoringLabel(bundle: Bundle) {
  return `${bundle.monitoringDays} dias de acompanhamento contínuo · ${bundle.sensors} sensores`;
}

export function bundleTotalDaysLabel(bundle: Bundle) {
  return `${bundle.monitoringDays} dias`;
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
