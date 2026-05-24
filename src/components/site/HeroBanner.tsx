import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { bannerGallery } from "@/lib/product-images";
import { StoreImage } from "@/components/site/StoreImage";

const slides = bannerGallery;

export function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="relative w-full">
      <div className="group relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div key={index} className="min-w-0 shrink-0 grow-0 basis-full">
                <StoreImage
                  srcMobile={slide.mobile}
                  srcDesktop={slide.desktop}
                  alt={slide.alt}
                  variant="banner"
                  bg={slide.bg}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Banner anterior"
          className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(13,13,13,0.12)] bg-white/90 text-[var(--ink)] opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white lg:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Próximo banner"
          className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(13,13,13,0.12)] bg-white/90 text-[var(--ink)] opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white lg:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 bg-[var(--paper)] py-4">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir para banner ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-[var(--primary)]"
                : "w-2 bg-[var(--ink)]/25 hover:bg-[var(--ink)]/40"
            }`}
          />
        ))}
      </div>

      <div className="border-b border-[rgba(13,13,13,0.08)] bg-[var(--paper)]">
        <div className="container-edge flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center sm:py-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ink)]/55">
            AiDEX X CGM · Monitoramento em tempo real · IP68 · App em português
          </p>
          <div className="flex items-center gap-5">
            <span className="rule hidden sm:block" />
            <Link
              to="/produto"
              className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:text-[var(--primary)]"
            >
              Comprar Agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
