import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { productGallery } from "@/lib/product-images";

const slides = productGallery.map(({ src, alt }) => ({ src, alt }));

function BannerSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="store-image block w-full h-auto"
      draggable={false}
    />
  );
}

function DotButton({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`h-2 rounded-full transition-all duration-300 ${
        selected ? "w-8 bg-[var(--primary)]" : "w-2 bg-[var(--ink)]/25 hover:bg-[var(--ink)]/40"
      }`}
    />
  );
}

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
            {slides.map((slide) => (
              <div key={slide.src} className="min-w-0 shrink-0 grow-0 basis-full">
                <BannerSlide {...slide} />
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
        {slides.map((slide, index) => (
          <DotButton
            key={slide.src}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
            label={`Ir para banner ${index + 1}`}
          />
        ))}
      </div>

      <div className="border-b border-[rgba(13,13,13,0.08)] bg-[var(--paper)]">
        <div className="container-edge flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center sm:py-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ink)]/55">
            Glycom G7 CGM · Kits 30, 60 e 90 dias · IP28 · App em português
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
