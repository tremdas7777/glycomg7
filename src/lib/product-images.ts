import imgAlerts from "@/assets/glycom-alerts-sleep.jpg";
import imgNoCalibration from "@/assets/glycom-no-calibration.jpg";
import imgContinuous from "@/assets/glycom-continuous-monitoring.jpg";
import imgYoga from "@/assets/glycom-lifestyle-yoga.jpg";
import imgShower from "@/assets/glycom-lifestyle-shower.jpg";
import imgApp from "@/assets/glycom-app-reports.jpg";
import imgProduct from "@/assets/glycom-product-details.jpg";

export const productGallery = [
  {
    src: imgNoCalibration,
    alt: "Glycom G7 CGM — monitoramento de glicose sem calibração",
    caption: "Monitoramento sem calibração",
    bg: "#FF7A00",
  },
  {
    src: imgAlerts,
    alt: "Glycom G7 — alertas de glicose em tempo real, inclusive durante o sono",
    caption: "Alertas em tempo real",
    bg: "#2a1f1c",
  },
  {
    src: imgContinuous,
    alt: "Glycom G7 — monitoramento contínuo de glicose dia e noite",
    caption: "Monitoramento contínuo 24h",
    bg: "#3d4550",
  },
  {
    src: imgYoga,
    alt: "Glycom G7 CGM — monitoramento de glicose sem complicação, sem escaneamento",
    caption: "Monitoramento sem complicação",
    bg: "#f0ebe3",
  },
  {
    src: imgProduct,
    alt: "Detalhes do kit Glycom G7 — sensor, aplicador, adesivo e guias",
    caption: "Detalhes do produto",
    bg: "#ffffff",
  },
  {
    src: imgShower,
    alt: "Glycom G7 resistente à água IP28 — use no banho, natação e dia a dia",
    caption: "Resistente à água IP28",
    bg: "#1a1a1a",
  },
  {
    src: imgApp,
    alt: "App Glycom — relatórios diários e AGP completos em português",
    caption: "Relatórios e AGP no app",
    bg: "#16a085",
  },
] as const;

export const productHeroImage = imgNoCalibration;
export const productKitImage = imgProduct;
