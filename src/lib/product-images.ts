import imgProductBox from "@/assets/aidex-product-box.png";

const orange = "#EF6B00";

export const productGallery = [
  {
    src: imgProductBox,
    alt: "AiDEX X CGM — sistema de monitoramento contínuo de glicose",
    caption: "AiDEX X · Monitoramento contínuo",
    bg: orange,
  },
  {
    src: imgProductBox,
    alt: "AiDEX X — preciso e confiável, até 15 dias por sensor",
    caption: "Preciso e confiável",
    bg: orange,
  },
  {
    src: imgProductBox,
    alt: "AiDEX X CGM — monitoramento sem calibração",
    caption: "Sem calibração",
    bg: "#ffffff",
  },
  {
    src: imgProductBox,
    alt: "AiDEX X — alertas de glicose em tempo real",
    caption: "Alertas em tempo real",
    bg: "#2a1f1c",
  },
] as const;

export const productHeroImage = imgProductBox;
export const productKitImage = imgProductBox;
