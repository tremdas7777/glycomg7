import { mxBrand } from "@/lib/locale/mx/brand";
import { resolveMxCheckoutUrl } from "@/lib/locale/mx/shopify";
import { mxPaths } from "@/lib/locale/mx/paths";

export type MxBundleId = "30" | "60" | "90";

export const MX_SENSOR_DAYS = mxBrand.sensorDays;
export const MX_SENSORS_PER_MONTH = mxBrand.sensorsPerMonth;
export const MX_FREE_DELIVERY_LABEL = "Envío gratis a todo México";

const LEGACY_IDS: Record<string, MxBundleId> = {
  "1": "30",
  "2": "60",
  "3": "90",
};

export type MxBundle = {
  id: MxBundleId;
  name: string;
  months: number;
  sensors: number;
  monitoringDays: number;
  price: number;
  compareAtPrice?: number;
  dailyCostLabel: string;
  description: string;
  checkoutProductName: string;
  checkoutProductDescription: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
  savings?: string;
};

function resolveCheckoutUrl(id: MxBundleId): string {
  const external = resolveMxCheckoutUrl(id);
  if (external) return external;
  return `${mxPaths.checkout}?plano=${id}`;
}

export const mxBundles: MxBundle[] = [
  {
    id: "30",
    name: "1 Mes de Monitoreo",
    months: 1,
    sensors: 2,
    monitoringDays: 30,
    price: 929,
    dailyCostLabel: "Menos de $31 MXN por día",
    description: "2 sensores CGM · 30 días de monitoreo continuo",
    checkoutProductName: `${mxBrand.productName} — 1 Mes · 2 Sensores · 30 días`,
    checkoutProductDescription: `${mxBrand.productName}: monitoreo continuo de glucosa por 30 días con 2 sensores CGM (${MX_SENSOR_DAYS} días cada uno). Lecturas automáticas en tiempo real, alertas inteligentes, app en español, reportes AGP. Sin calibración. Resistente al agua IP68. ${MX_FREE_DELIVERY_LABEL}.`,
    checkoutUrl: resolveCheckoutUrl("30"),
  },
  {
    id: "60",
    name: "2 Meses de Monitoreo",
    months: 2,
    sensors: 4,
    monitoringDays: 60,
    price: 1739,
    compareAtPrice: 1869,
    dailyCostLabel: "Mejor precio mensual",
    description: "4 sensores CGM · 60 días de monitoreo continuo",
    checkoutProductName: `${mxBrand.productName} — 2 Meses · 4 Sensores · 60 días`,
    checkoutProductDescription: `${mxBrand.productName}: 60 días de monitoreo glucémico con 4 sensores CGM. Tecnología en tiempo real, alertas de hipo e hiperglucemia, app completa en español. ${MX_FREE_DELIVERY_LABEL}. Mejor relación costo-beneficio.`,
    checkoutUrl: resolveCheckoutUrl("60"),
    featured: true,
    badge: "Más vendido",
    savings: "Ahorra $130 MXN",
  },
  {
    id: "90",
    name: "3 Meses de Monitoreo",
    months: 3,
    sensors: 6,
    monitoringDays: 90,
    price: 2439,
    compareAtPrice: 2803,
    dailyCostLabel: "Mayor ahorro por sensor",
    description: "6 sensores CGM · 90 días de monitoreo continuo",
    checkoutProductName: `${mxBrand.productName} — 3 Meses · 6 Sensores · 90 días`,
    checkoutProductDescription: `${mxBrand.productName}: 90 días de monitoreo continuo con 6 sensores CGM. Máximo ahorro por sensor, datos 24 horas en tu celular, gestión inteligente de la salud metabólica. ${MX_FREE_DELIVERY_LABEL}.`,
    checkoutUrl: resolveCheckoutUrl("90"),
    badge: "Mejor precio",
    savings: "Ahorra $364 MXN",
  },
];

export function parseMxBundleId(raw: string | undefined): MxBundleId | undefined {
  if (!raw) return undefined;
  if (raw === "30" || raw === "60" || raw === "90") return raw;
  return LEGACY_IDS[raw];
}

export function getMxBundle(id: string | undefined): MxBundle {
  const parsed = parseMxBundleId(id);
  return mxBundles.find((b) => b.id === parsed) ?? mxBundles[1];
}

export function getMxCheckoutUrl(id: string | undefined) {
  return getMxBundle(id).checkoutUrl;
}

export function getMxUpgradeBundle(current: MxBundle): MxBundle | null {
  if (current.id === "30") return mxBundles.find((b) => b.id === "60") ?? null;
  if (current.id === "60") return mxBundles.find((b) => b.id === "90") ?? null;
  return null;
}

export function mxBundleDurationLabel(bundle: MxBundle) {
  return `${bundle.sensors} sensores CGM · ${bundle.monitoringDays} días de monitoreo`;
}

export function mxBundleMonitoringLabel(bundle: MxBundle) {
  return `${bundle.monitoringDays} días de monitoreo continuo · ${bundle.sensors} sensores`;
}

export function mxBundleTotalDaysLabel(bundle: MxBundle) {
  return `${bundle.monitoringDays} días`;
}

export const mxn = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
