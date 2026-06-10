import { deBrand } from "@/lib/locale/de/brand";
import { buildDeShopifyCheckoutUrl, DE_SHOPIFY_PRODUCT_IDS } from "@/lib/locale/de/shopify";
import { dePaths } from "@/lib/locale/de/paths";

export type DeBundleId = "30" | "60" | "90";

export const DE_SENSOR_DAYS = deBrand.sensorDays;
export const DE_SENSORS_PER_MONTH = deBrand.sensorsPerMonth;
export const DE_FREE_SHIPPING_LABEL = "Kostenloser Versand in ganz Deutschland";

const LEGACY_IDS: Record<string, DeBundleId> = {
  "1": "30",
  "2": "60",
  "3": "90",
};

export type DeBundle = {
  id: DeBundleId;
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

function resolveCheckoutUrl(id: DeBundleId): string {
  const productId = DE_SHOPIFY_PRODUCT_IDS[id];
  const external = buildDeShopifyCheckoutUrl(productId);
  if (external) return external;
  return `${dePaths.checkout}?plano=${id}`;
}

export const deBundles: DeBundle[] = [
  {
    id: "30",
    name: "1 Monat Monitoring",
    months: 1,
    sensors: 2,
    monitoringDays: 30,
    price: 49,
    dailyCostLabel: "Weniger als €1,70 pro Tag",
    description: "2 CGM-Sensoren · 30 Tage kontinuierliches Monitoring",
    checkoutProductName: `${deBrand.productName} — 1 Monat · 2 Sensoren · 30 Tage`,
    checkoutProductDescription: `${deBrand.productName}: Kontinuierliches Glukose-Monitoring für 30 Tage mit 2 CGM-Sensoren (${DE_SENSOR_DAYS} Tage je Sensor). Automatische Echtzeit-Messungen, intelligente Alarme, App auf Deutsch, AGP-Berichte. Keine Kalibrierung. Wasserdicht IP68. ${DE_FREE_SHIPPING_LABEL}.`,
    checkoutUrl: resolveCheckoutUrl("30"),
  },
  {
    id: "60",
    name: "2 Monate Monitoring",
    months: 2,
    sensors: 4,
    monitoringDays: 60,
    price: 89,
    compareAtPrice: 98,
    dailyCostLabel: "Bester Monatspreis",
    description: "4 CGM-Sensoren · 60 Tage kontinuierliches Monitoring",
    checkoutProductName: `${deBrand.productName} — 2 Monate · 4 Sensoren · 60 Tage`,
    checkoutProductDescription: `${deBrand.productName}: 60 Tage Glukose-Monitoring mit 4 CGM-Sensoren. Echtzeit-Technologie, Hypo- und Hyperglykämie-Alarme, vollständige App auf Deutsch. ${DE_FREE_SHIPPING_LABEL}. Bestes Preis-Leistungs-Verhältnis.`,
    checkoutUrl: resolveCheckoutUrl("60"),
    featured: true,
    badge: "Bestseller",
    savings: "Sparen Sie €9",
  },
  {
    id: "90",
    name: "3 Monate Monitoring",
    months: 3,
    sensors: 6,
    monitoringDays: 90,
    price: 119,
    compareAtPrice: 147,
    dailyCostLabel: "Größte Ersparnis pro Sensor",
    description: "6 CGM-Sensoren · 90 Tage kontinuierliches Monitoring",
    checkoutProductName: `${deBrand.productName} — 3 Monate · 6 Sensoren · 90 Tage`,
    checkoutProductDescription: `${deBrand.productName}: 90 Tage kontinuierliches Monitoring mit 6 CGM-Sensoren. Maximale Ersparnis pro Sensor, 24h-Daten auf dem Handy, intelligentes metabolisches Gesundheitsmanagement. ${DE_FREE_SHIPPING_LABEL}.`,
    checkoutUrl: resolveCheckoutUrl("90"),
    badge: "Bestes Preis-Leistungs-Verhältnis",
    savings: "Sparen Sie €28",
  },
];

export function parseDeBundleId(raw: string | undefined): DeBundleId | undefined {
  if (!raw) return undefined;
  if (raw === "30" || raw === "60" || raw === "90") return raw;
  return LEGACY_IDS[raw];
}

export function getDeBundle(id: string | undefined): DeBundle {
  const parsed = parseDeBundleId(id);
  return deBundles.find((b) => b.id === parsed) ?? deBundles[1];
}

export function getDeCheckoutUrl(id: string | undefined) {
  return getDeBundle(id).checkoutUrl;
}

export function getDeUpgradeBundle(current: DeBundle): DeBundle | null {
  if (current.id === "30") return deBundles.find((b) => b.id === "60") ?? null;
  if (current.id === "60") return deBundles.find((b) => b.id === "90") ?? null;
  return null;
}

export function deBundleDurationLabel(bundle: DeBundle) {
  return `${bundle.sensors} CGM-Sensoren · ${bundle.monitoringDays} Tage Monitoring`;
}

export function deBundleMonitoringLabel(bundle: DeBundle) {
  return `${bundle.monitoringDays} Tage kontinuierliches Monitoring · ${bundle.sensors} Sensoren`;
}

export function deBundleTotalDaysLabel(bundle: DeBundle) {
  return `${bundle.monitoringDays} Tage`;
}

export const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
