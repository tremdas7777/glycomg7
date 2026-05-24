export type BundleId = "30" | "60" | "90";

export type Bundle = {
  id: BundleId;
  name: string;
  days: number;
  sensors: number;
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
    price: 397,
    installment: "12x de R$39,70",
    description: "Monitoramento contínuo por 30 dias.",
  },
  {
    id: "60",
    name: "Kit 60 Dias",
    days: 60,
    sensors: 4,
    price: 697,
    originalPrice: 794,
    installment: "12x de R$69,70",
    description: "Monitoramento contínuo por 60 dias. Melhor custo-benefício.",
    featured: true,
    badge: "Mais Vendido",
    savings: "Economize R$97",
  },
  {
    id: "90",
    name: "Kit 90 Dias",
    days: 90,
    sensors: 6,
    price: 997,
    originalPrice: 1191,
    installment: "12x de R$99,70",
    description: "Monitoramento contínuo por 90 dias. Máxima economia.",
    savings: "Economize R$194",
  },
];

export function getBundle(id: string | undefined): Bundle {
  return bundles.find((b) => b.id === id) ?? bundles[1];
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
