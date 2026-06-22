import { Link } from "@tanstack/react-router";
import { mxBannerGallery } from "@/lib/locale/mx/product-images";
import { StoreImage } from "@/components/site/StoreImage";
import { mxPaths } from "@/lib/locale/mx/paths";

const slide = mxBannerGallery[0];

export function MxHeroBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: slide.bg }}>
      <StoreImage
        srcMobile={slide.mobile}
        srcDesktop={slide.desktop}
        alt={slide.alt}
        variant="banner"
        bg={slide.bg}
        loading="eager"
        draggable={false}
      />

      <div className="border-b border-[rgba(13,13,13,0.08)] bg-[var(--paper)]">
        <div className="container-edge flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center sm:py-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ink)]/55">
            Sensor de glucosa AiDEX G7 · Tiempo real 24h · Sin pinchazos de rutina · Envío gratis a México
          </p>
          <div className="flex items-center">
            <Link
              to={mxPaths.product}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_30px_-14px_rgba(101,163,13,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-[0_16px_34px_-14px_rgba(101,163,13,0.95)]"
            >
              Ver planes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
