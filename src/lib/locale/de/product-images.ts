/**
 * Bilder der deutschen Version — separate Dateien unter src/assets/de/.
 * Artes nativas em alemão (não são overlays). Reinstalar: python3 scripts/install-de-images.py
 */
import imgProdKit from "@/assets/de/aidex-prod-kit.webp";
import imgProdReports from "@/assets/de/aidex-prod-reports.webp";
import imgProdBluetooth from "@/assets/de/aidex-prod-bluetooth.webp";
import imgProdWater from "@/assets/de/aidex-prod-water.webp";
import imgProdFeatures from "@/assets/de/aidex-prod-features.webp";
import bannerStoreMobile from "@/assets/de/banner-store-mobile.webp";
import bannerStoreDesktop from "@/assets/de/banner-store-desktop.jpg";
import { deBrand } from "@/lib/locale/de/brand";

export type DeBannerSlide = {
  mobile: string;
  desktop: string;
  alt: string;
  caption: string;
  bg: string;
};

export const deBannerGallery: DeBannerSlide[] = [
  {
    mobile: bannerStoreMobile,
    desktop: bannerStoreDesktop,
    alt: "AiDEX G7 — Keine Kalibrierung · MARD 8,66%",
    caption: "Keine Kalibrierung · MARD 8,66%",
    bg: "#1a1a1a",
  },
];

export type DeGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  bg?: string;
};

export const deProductGallery: DeGalleryItem[] = [
  {
    src: imgProdKit,
    alt: "AiDEX G7 — Kit mit Verpackung, Applikator, Sensor und App",
    caption: "Monitoring ohne Kalibrierung",
    bg: "#ffffff",
  },
  {
    src: imgProdFeatures,
    alt: "AiDEX G7 — schmerzfrei, keine Kalibrierung, 15 Tage Monitoring",
    caption: "Schmerzfrei · Keine Kalibrierung",
  },
  {
    src: imgProdReports,
    alt: "AiDEX G7 App — Tagesberichte und AGP",
    caption: "Vollständige Berichte und AGP",
  },
  {
    src: imgProdBluetooth,
    alt: "AiDEX G7 — unkompliziertes Monitoring, kein Scannen",
    caption: "Kein Scannen erforderlich",
  },
  {
    src: imgProdWater,
    alt: "AiDEX G7 — wasserdicht",
    caption: "Wasserdicht · IP68",
  },
];

export const deProductHeroImage = imgProdKit;
export const deProductKitImage = imgProdKit;

export const deHomeImages = {
  bannerWide: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  heroSensor: { mobile: imgProdKit, desktop: imgProdKit },
  appIphone: { mobile: imgProdReports, desktop: imgProdReports },
  lifestyleRunning: { mobile: imgProdBluetooth, desktop: imgProdBluetooth },
  lifestyleFood: { mobile: imgProdFeatures, desktop: imgProdFeatures },
} as const;

export const deLogoAlt = `${deBrand.productName} Logo`;
