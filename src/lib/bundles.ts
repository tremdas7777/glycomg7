export type BundleId = "30" | "60" | "90";

export const SENSOR_DAYS = 15;
export const SENSORS_PER_UNIT = 2;

export type Bundle = {
  id: BundleId;
  name: string;
  /** Nome do produto para checkout externo */
  checkoutProductName: string;
  /** Descrição do produto para checkout externo */
  checkoutProductDescription: string;
  /** Link do checkout externo */
  checkoutUrl: string;
  days: number;
  sensors: number;
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
    id: "30",
    name: "Kit 30 Dias",
    checkoutProductName: "Glycom G7 CGM — Kit 30 Dias · 2 Sensores · 1 Unidade",
    checkoutProductDescription:
      "Sensor Glycom G7 CGM para monitoramento contínuo de glicose. Kit com 1 unidade (2 sensores de 15 dias), totalizando 30 dias de acompanhamento. Leituras automáticas a cada minuto, sem calibração e sem escaneamento. App em português para iOS e Android. Resistente à água IP28. Inclui aplicador, adesivo e guias de uso.",
    checkoutUrl:
      "https://seguro.checkoutsensor.shop/api/public/shopify?product=123058944347&store=1230",
    days: 30,
    sensors: 2,
    units: 1,
    price: 397,
    installment: "12x de R$39,70",
    description: "30 dias de monitoramento · 2 sensores (1 unidade).",
  },
  {
    id: "60",
    name: "Kit 60 Dias",
    checkoutProductName: "Glycom G7 CGM — Kit 60 Dias · 4 Sensores · 2 Unidades",
    checkoutProductDescription:
      "Sensor Glycom G7 CGM para monitoramento contínuo de glicose. Kit com 2 unidades (4 sensores de 15 dias), totalizando 60 dias de acompanhamento. Leituras em tempo real, alertas de hipo e hiperglicemia, relatórios AGP no app. Sem calibração, app em português, resistente à água IP28. Melhor custo-benefício. Inclui aplicadores, adesivos e guias.",
    checkoutUrl:
      "https://seguro.checkoutsensor.shop/api/public/shopify?product=123089695188&store=1230",
    days: 60,
    sensors: 4,
    units: 2,
    price: 697,
    originalPrice: 794,
    installment: "12x de R$69,70",
    description: "60 dias de monitoramento · 4 sensores (2 unidades). Melhor custo-benefício.",
    featured: true,
    badge: "Mais Vendido",
    savings: "Economize R$97",
  },
  {
    id: "90",
    name: "Kit 90 Dias",
    checkoutProductName: "Glycom G7 CGM — Kit 90 Dias · 6 Sensores · 3 Unidades",
    checkoutProductDescription:
      "Sensor Glycom G7 CGM para monitoramento contínuo de glicose. Kit com 3 unidades (6 sensores de 15 dias), totalizando 90 dias de acompanhamento. Monitoramento 24h, tendências e alertas inteligentes direto no celular. Sem calibração, app em português, resistente à água IP28. Máxima economia para uso contínuo. Inclui aplicadores, adesivos e guias.",
    checkoutUrl:
      "https://seguro.checkoutsensor.shop/api/public/shopify?product=123018184999&store=1230",
    days: 90,
    sensors: 6,
    units: 3,
    price: 997,
    originalPrice: 1191,
    installment: "12x de R$99,70",
    description: "90 dias de monitoramento · 6 sensores (3 unidades). Máxima economia.",
    savings: "Economize R$194",
  },
];

export function getBundle(id: string | undefined): Bundle {
  return bundles.find((b) => b.id === id) ?? bundles[1];
}

export function getCheckoutUrl(id: string | undefined) {
  return getBundle(id).checkoutUrl;
}

export function bundleDurationLabel(bundle: Bundle) {
  const units =
    bundle.units === 1 ? "1 unidade" : `${bundle.units} unidades`;
  return `${bundle.days} dias · ${bundle.sensors} sensores · ${units}`;
}

export function bundleMonitoringLabel(bundle: Bundle) {
  return `Até ${bundle.days} dias de monitoramento · ${bundle.sensors} sensores de ${SENSOR_DAYS} dias`;
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
