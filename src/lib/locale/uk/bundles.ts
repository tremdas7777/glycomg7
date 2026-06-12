import { ukBrand } from "@/lib/locale/uk/brand";
import { resolveUkCheckoutUrl } from "@/lib/locale/uk/shopify";
import { ukPaths } from "@/lib/locale/uk/paths";

export type UkBundleId = "30" | "60" | "90";

export const UK_SENSOR_DAYS = ukBrand.sensorDays;
export const UK_SENSORS_PER_MONTH = ukBrand.sensorsPerMonth;
export const UK_FREE_DELIVERY_LABEL = "Free delivery across the United Kingdom";

const LEGACY_IDS: Record<string, UkBundleId> = {
  "1": "30",
  "2": "60",
  "3": "90",
};

export type UkBundle = {
  id: UkBundleId;
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

function resolveCheckoutUrl(id: UkBundleId): string {
  const external = resolveUkCheckoutUrl(id);
  if (external) return external;
  return `${ukPaths.checkout}?plano=${id}`;
}

export const ukBundles: UkBundle[] = [
  {
    id: "30",
    name: "1 Month Monitoring",
    months: 1,
    sensors: 2,
    monitoringDays: 30,
    price: 75,
    dailyCostLabel: "Less than £2.50 per day",
    description: "2 CGM sensors · 30 days continuous monitoring",
    checkoutProductName: `${ukBrand.productName} — 1 Month · 2 Sensors · 30 Days`,
    checkoutProductDescription: `${ukBrand.productName}: Continuous glucose monitoring for 30 days with 2 CGM sensors (${UK_SENSOR_DAYS} days per sensor). Automatic real-time readings, smart alerts, English app, AGP reports. No calibration. Waterproof IP68. ${UK_FREE_DELIVERY_LABEL}.`,
    checkoutUrl: resolveCheckoutUrl("30"),
  },
  {
    id: "60",
    name: "2 Months Monitoring",
    months: 2,
    sensors: 4,
    monitoringDays: 60,
    price: 139,
    compareAtPrice: 150,
    dailyCostLabel: "Best monthly price",
    description: "4 CGM sensors · 60 days continuous monitoring",
    checkoutProductName: `${ukBrand.productName} — 2 Months · 4 Sensors · 60 Days`,
    checkoutProductDescription: `${ukBrand.productName}: 60 days glucose monitoring with 4 CGM sensors. Real-time technology, hypo and hyper alerts, full English app. ${UK_FREE_DELIVERY_LABEL}. Best value.`,
    checkoutUrl: resolveCheckoutUrl("60"),
    featured: true,
    badge: "Bestseller",
    savings: "Save £11",
  },
  {
    id: "90",
    name: "3 Months Monitoring",
    months: 3,
    sensors: 6,
    monitoringDays: 90,
    price: 199,
    compareAtPrice: 225,
    dailyCostLabel: "Biggest saving per sensor",
    description: "6 CGM sensors · 90 days continuous monitoring",
    checkoutProductName: `${ukBrand.productName} — 3 Months · 6 Sensors · 90 Days`,
    checkoutProductDescription: `${ukBrand.productName}: 90 days continuous monitoring with 6 CGM sensors. Maximum saving per sensor, 24-hour data on your phone, intelligent metabolic health management. ${UK_FREE_DELIVERY_LABEL}.`,
    checkoutUrl: resolveCheckoutUrl("90"),
    badge: "Best value",
    savings: "Save £26",
  },
];

export function parseUkBundleId(raw: string | undefined): UkBundleId | undefined {
  if (!raw) return undefined;
  if (raw === "30" || raw === "60" || raw === "90") return raw;
  return LEGACY_IDS[raw];
}

export function getUkBundle(id: string | undefined): UkBundle {
  const parsed = parseUkBundleId(id);
  return ukBundles.find((b) => b.id === parsed) ?? ukBundles[1];
}

export function getUkCheckoutUrl(id: string | undefined) {
  return getUkBundle(id).checkoutUrl;
}

export function getUkUpgradeBundle(current: UkBundle): UkBundle | null {
  if (current.id === "30") return ukBundles.find((b) => b.id === "60") ?? null;
  if (current.id === "60") return ukBundles.find((b) => b.id === "90") ?? null;
  return null;
}

export function ukBundleDurationLabel(bundle: UkBundle) {
  return `${bundle.sensors} CGM sensors · ${bundle.monitoringDays} days monitoring`;
}

export function ukBundleMonitoringLabel(bundle: UkBundle) {
  return `${bundle.monitoringDays} days continuous monitoring · ${bundle.sensors} sensors`;
}

export function ukBundleTotalDaysLabel(bundle: UkBundle) {
  return `${bundle.monitoringDays} days`;
}

export const gbp = (n: number) => n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
