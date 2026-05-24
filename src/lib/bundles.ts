export type BundleId = "30" | "60" | "90";

export const SENSOR_DAYS = 15;
export const SENSORS_PER_UNIT = 2;

export type Bundle = {
  id: BundleId;
  name: string;
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
