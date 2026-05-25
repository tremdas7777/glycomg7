import { brand } from "@/lib/brand";

/** Quantidade de unidades (1 unidade = 1 sensor = 15 dias) */
export type BundleId = "1" | "2" | "3";

export const SENSOR_DAYS = brand.sensorDays;

const LEGACY_KIT_IDS: Record<string, BundleId> = {
  "30": "1",
  "60": "2",
  "90": "3",
};

export type Bundle = {
  id: BundleId;
  name: string;
  /** Dias totais de monitoramento (unidades × 15) */
  totalDays: number;
  checkoutProductName: string;
  checkoutProductDescription: string;
  checkoutUrl: string;
  units: number;
  price: number;
  originalPrice?: number;
  installment: string;
  description: string;
  featured?: boolean;
  badge?: string;
  savings?: string;
};

export const bundles: Bundle[] = [
  {
    id: "1",
    name: "1 Unidade",
    totalDays: SENSOR_DAYS,
    checkoutProductName: `${brand.productName} — 1 Unidade · 1 Sensor · ${SENSOR_DAYS} dias`,
    checkoutProductDescription:
      `Sensor ${brand.productName} para monitoramento contínuo de glicose. 1 unidade com 1 sensor de ${SENSOR_DAYS} dias de uso. Leituras automáticas a cada minuto, sem calibração e sem escaneamento. App em português para iOS e Android. Resistente à água IP68. Inclui aplicador, adesivo e guias de uso.`,
    checkoutUrl:
      "https://seguro.checkoutsensor.shop/api/public/shopify?product=123058944347&store=1230",
    units: 1,
    price: 397,
    installment: "12x de R$39,70",
    description: `1 sensor · ${SENSOR_DAYS} dias de monitoramento.`,
  },
  {
    id: "2",
    name: "2 Unidades",
    totalDays: SENSOR_DAYS * 2,
    checkoutProductName: `${brand.productName} — 2 Unidades · 2 Sensores · ${SENSOR_DAYS * 2} dias`,
    checkoutProductDescription:
      `Sensor ${brand.productName} para monitoramento contínuo de glicose. 2 unidades com 2 sensores de ${SENSOR_DAYS} dias cada, totalizando ${SENSOR_DAYS * 2} dias de acompanhamento. Leituras em tempo real, alertas de hipo e hiperglicemia, relatórios AGP no app. Sem calibração, app em português, resistente à água IP68. Melhor custo-benefício. Inclui aplicadores, adesivos e guias.`,
    checkoutUrl:
      "https://seguro.checkoutsensor.shop/api/public/shopify?product=123089695188&store=1230",
    units: 2,
    price: 697,
    originalPrice: 794,
    installment: "12x de R$69,70",
    description: `2 sensores · ${SENSOR_DAYS * 2} dias de monitoramento. Melhor custo-benefício.`,
    featured: true,
    badge: "Mais Vendido",
    savings: "Economize R$97",
  },
  {
    id: "3",
    name: "3 Unidades",
    totalDays: SENSOR_DAYS * 3,
    checkoutProductName: `${brand.productName} — 3 Unidades · 3 Sensores · ${SENSOR_DAYS * 3} dias`,
    checkoutProductDescription:
      `Sensor ${brand.productName} para monitoramento contínuo de glicose. 3 unidades com 3 sensores de ${SENSOR_DAYS} dias cada, totalizando ${SENSOR_DAYS * 3} dias de acompanhamento. Monitoramento 24h, tendências e alertas inteligentes direto no celular. Sem calibração, app em português, resistente à água IP68. Máxima economia para uso contínuo. Inclui aplicadores, adesivos e guias.`,
    checkoutUrl:
      "https://seguro.checkoutsensor.shop/api/public/shopify?product=123018184999&store=1230",
    units: 3,
    price: 997,
    originalPrice: 1191,
    installment: "12x de R$99,70",
    description: `3 sensores · ${SENSOR_DAYS * 3} dias de monitoramento. Máxima economia.`,
    savings: "Economize R$194",
  },
];

export function parseBundleId(raw: string | undefined): BundleId | undefined {
  if (!raw) return undefined;
  if (raw === "1" || raw === "2" || raw === "3") return raw;
  return LEGACY_KIT_IDS[raw];
}

export function getBundle(id: string | undefined): Bundle {
  const parsed = parseBundleId(id);
  return bundles.find((b) => b.id === parsed) ?? bundles[1];
}

export function getCheckoutUrl(id: string | undefined) {
  return getBundle(id).checkoutUrl;
}

export function unitsLabel(units: number) {
  return units === 1 ? "1 unidade" : `${units} unidades`;
}

export function bundleDurationLabel(bundle: Bundle) {
  const days =
    bundle.totalDays === 1 ? "1 dia" : `${bundle.totalDays} dias`;
  return `${unitsLabel(bundle.units)} · ${bundle.units} sensor${bundle.units > 1 ? "es" : ""} · ${days} de monitoramento`;
}

export function bundleMonitoringLabel(bundle: Bundle) {
  const days =
    bundle.totalDays === 1 ? "1 dia" : `${bundle.totalDays} dias`;
  return `Até ${days} de monitoramento · ${bundle.units} sensor${bundle.units > 1 ? "es" : ""} de ${SENSOR_DAYS} dias`;
}

export function bundleTotalDaysLabel(bundle: Bundle) {
  return bundle.totalDays === 1 ? "1 dia" : `${bundle.totalDays} dias`;
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
