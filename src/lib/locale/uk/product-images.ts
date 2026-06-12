/**
 * UK version images — separate files under src/assets/uk/.
 * English marketing art (regenerated, not overlaid). Install: python3 scripts/install-uk-images.py
 */
import imgProdKit from "@/assets/uk/aidex-prod-kit.webp";
import imgProdReports from "@/assets/uk/aidex-prod-reports.webp";
import imgProdBluetooth from "@/assets/uk/aidex-prod-bluetooth.webp";
import imgProdWater from "@/assets/uk/aidex-prod-water.webp";
import imgProdFeatures from "@/assets/uk/aidex-prod-features.webp";
import bannerStoreMobile from "@/assets/uk/banner-store-mobile.webp";
import bannerStoreDesktop from "@/assets/uk/banner-store-desktop.jpg";
import { ukBrand } from "@/lib/locale/uk/brand";

export type UkBannerSlide = {
  mobile: string;
  desktop: string;
  alt: string;
  caption: string;
  bg: string;
};

export const ukBannerGallery: UkBannerSlide[] = [
  {
    mobile: bannerStoreMobile,
    desktop: bannerStoreDesktop,
    alt: "AiDEX G7 — No calibration · MARD 8.66%",
    caption: "No calibration · MARD 8.66%",
    bg: "#1a1a1a",
  },
];

export type UkGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  bg?: string;
};

export const ukProductGallery: UkGalleryItem[] = [
  {
    src: imgProdKit,
    alt: "AiDEX G7 — kit with packaging, applicator, sensor and app",
    caption: "Monitoring without calibration",
    bg: "#ffffff",
  },
  {
    src: imgProdFeatures,
    alt: "AiDEX G7 — painless, no calibration, 15 days monitoring",
    caption: "Painless · No calibration",
  },
  {
    src: imgProdReports,
    alt: "AiDEX G7 app — daily reports and AGP",
    caption: "Full reports and AGP",
  },
  {
    src: imgProdBluetooth,
    alt: "AiDEX G7 — effortless monitoring, no scanning",
    caption: "No scanning required",
  },
  {
    src: imgProdWater,
    alt: "AiDEX G7 — waterproof",
    caption: "Waterproof · IP68",
  },
];

export const ukProductHeroImage = imgProdKit;
export const ukProductKitImage = imgProdKit;

export const ukHomeImages = {
  bannerWide: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  heroSensor: { mobile: imgProdKit, desktop: imgProdKit },
  appIphone: { mobile: imgProdReports, desktop: imgProdReports },
  lifestyleRunning: { mobile: imgProdBluetooth, desktop: imgProdBluetooth },
  lifestyleFood: { mobile: imgProdFeatures, desktop: imgProdFeatures },
} as const;

export const ukLogoAlt = `${ukBrand.productName} logo`;
