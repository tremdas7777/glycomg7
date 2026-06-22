/**
 * MX version images — reuses the UK image assets (same product art).
 */
import imgProdKit from "@/assets/uk/aidex-prod-kit.webp";
import imgProdReports from "@/assets/uk/aidex-prod-reports.webp";
import imgProdBluetooth from "@/assets/uk/aidex-prod-bluetooth.webp";
import imgProdWater from "@/assets/uk/aidex-prod-water.webp";
import imgProdFeatures from "@/assets/uk/aidex-prod-features.webp";
import bannerStoreMobile from "@/assets/uk/banner-store-mobile.webp";
import bannerStoreDesktop from "@/assets/uk/banner-store-desktop.jpg";
import { mxBrand } from "@/lib/locale/mx/brand";

export type MxBannerSlide = {
  mobile: string;
  desktop: string;
  alt: string;
  caption: string;
  bg: string;
};

export const mxBannerGallery: MxBannerSlide[] = [
  {
    mobile: bannerStoreMobile,
    desktop: bannerStoreDesktop,
    alt: "AiDEX G7 — Sin calibración · MARD 8.66%",
    caption: "Sin calibración · MARD 8.66%",
    bg: "#1a1a1a",
  },
];

export type MxGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  bg?: string;
};

export const mxProductGallery: MxGalleryItem[] = [
  {
    src: imgProdKit,
    alt: "AiDEX G7 — kit con empaque, aplicador, sensor y app",
    caption: "Monitoreo sin calibración",
    bg: "#ffffff",
  },
  {
    src: imgProdFeatures,
    alt: "AiDEX G7 — sin dolor, sin calibración, 15 días de monitoreo",
    caption: "Sin dolor · Sin calibración",
  },
  {
    src: imgProdReports,
    alt: "App AiDEX G7 — reportes diarios y AGP",
    caption: "Reportes completos y AGP",
  },
  {
    src: imgProdBluetooth,
    alt: "AiDEX G7 — monitoreo sin esfuerzo, sin escaneo",
    caption: "Sin necesidad de escanear",
  },
  {
    src: imgProdWater,
    alt: "AiDEX G7 — resistente al agua",
    caption: "Resistente al agua · IP68",
  },
];

export const mxProductHeroImage = imgProdKit;
export const mxProductKitImage = imgProdKit;

export const mxHomeImages = {
  bannerWide: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  heroSensor: { mobile: imgProdKit, desktop: imgProdKit },
  appIphone: { mobile: imgProdReports, desktop: imgProdReports },
  lifestyleRunning: { mobile: imgProdBluetooth, desktop: imgProdBluetooth },
  lifestyleFood: { mobile: imgProdFeatures, desktop: imgProdFeatures },
} as const;

export const mxLogoAlt = `${mxBrand.productName} logo`;
