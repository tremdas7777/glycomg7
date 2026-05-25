import imgProdKit from "@/assets/aidex-prod-kit.png";
import imgProdReports from "@/assets/aidex-prod-reports.png";
import imgProdBluetooth from "@/assets/aidex-prod-bluetooth.png";
import imgProdWater from "@/assets/aidex-prod-water.png";
import imgProdFeatures from "@/assets/aidex-prod-features.png";
import bannerStoreMobile from "@/assets/banner-store-mobile.jpg";
import bannerStoreDesktop from "@/assets/banner-store-desktop.jpg";
import { brand } from "@/lib/brand";

export type BannerSlide = {
  mobile: string;
  desktop: string;
  alt: string;
  caption: string;
  bg: string;
};

/** Único banner da loja — desktop (horizontal) + mobile (vertical) */
export const bannerGallery: BannerSlide[] = [
  {
    mobile: bannerStoreMobile,
    desktop: bannerStoreDesktop,
    alt: "AiDEX G7 — Sem calibração · MARD 8,66%",
    caption: "Sem calibração · MARD 8,66%",
    bg: "#1a1a1a",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Fundo do quadro (ex.: #ffffff para foto em fundo branco) */
  bg?: string;
};

/** Galeria produto — kit principal + artes de marketing */
export const productGallery: GalleryItem[] = [
  {
    src: imgProdKit,
    alt: "AiDEX G7 — kit com embalagem, aplicador, sensor e app",
    caption: "Monitoramento sem calibração",
    bg: "#ffffff",
  },
  {
    src: imgProdFeatures,
    alt: "AiDEX G7 — indolor, sem calibração, 15 dias de monitoramento",
    caption: "Indolor · Sem calibração",
  },
  {
    src: imgProdReports,
    alt: "App AiDEX G7 — relatórios diários e AGP",
    caption: "Relatórios e AGP completos",
  },
  {
    src: imgProdBluetooth,
    alt: "AiDEX G7 — monitoramento sem complicação, sem escanear",
    caption: "Sem necessidade de escanear",
  },
  {
    src: imgProdWater,
    alt: "AiDEX G7 — resistente à água",
    caption: "Resistente à água · IP68",
  },
];

export const productHeroImage = imgProdKit;
export const productKitImage = imgProdKit;

export const homeImages = {
  bannerWide: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  heroSensor: { mobile: imgProdKit, desktop: imgProdKit },
  appIphone: { mobile: imgProdReports, desktop: imgProdReports },
  lifestyleRunning: { mobile: imgProdBluetooth, desktop: imgProdBluetooth },
  lifestyleFood: { mobile: imgProdFeatures, desktop: imgProdFeatures },
} as const;
