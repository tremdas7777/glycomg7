import { cn } from "@/lib/utils";

export type StoreImageVariant =
  | "banner"
  | "product-hero"
  | "product-thumb"
  | "section-banner"
  | "section-content";

const variantStyles: Record<
  StoreImageVariant,
  { frame: string; padding: string; img?: string }
> = {
  banner: {
    frame: "aspect-[4/5] w-full md:aspect-video",
    padding: "p-0",
    img: "h-full w-full object-cover object-center",
  },
  "product-hero": {
    frame: "aspect-[4/5] w-full md:aspect-video",
    padding: "p-1 sm:p-2 md:p-4",
  },
  "product-thumb": {
    frame: "aspect-video w-full md:aspect-[4/3]",
    padding: "p-0.5",
  },
  "section-banner": {
    frame: "aspect-[4/5] w-full md:aspect-video",
    padding: "p-0",
    img: "h-full w-full object-cover object-center",
  },
  "section-content": {
    frame: "aspect-video w-full md:aspect-[3/2]",
    padding: "p-1 sm:p-2 md:p-4",
  },
};

const imgContain = "max-h-full max-w-full object-contain object-center";

export type ResponsiveSources = {
  mobile: string;
  desktop: string;
};

type StoreImageProps = {
  /** Usar apenas quando não houver par mobile + desktop */
  src?: string;
  srcMobile?: string;
  srcDesktop?: string;
  alt: string;
  variant: StoreImageVariant;
  bg?: string;
  className?: string;
  frameClassName?: string;
  loading?: "lazy" | "eager";
  draggable?: boolean;
};

export function StoreImage({
  src,
  srcMobile,
  srcDesktop,
  alt,
  variant,
  bg,
  className,
  frameClassName,
  loading,
  draggable,
}: StoreImageProps) {
  const styles = variantStyles[variant];
  const hasPair = Boolean(srcMobile && srcDesktop);
  const imgClass = styles.img ?? imgContain;

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        variant === "banner" || variant === "section-banner"
          ? "rounded-none"
          : "rounded-2xl",
        styles.frame,
        styles.padding,
        frameClassName,
      )}
      style={{ backgroundColor: bg ?? "var(--muted)" }}
    >
      {hasPair ? (
        <>
          <img
            src={srcMobile}
            alt={alt}
            loading={loading}
            draggable={draggable}
            className={cn("md:hidden", imgClass, className)}
          />
          <img
            src={srcDesktop}
            alt={alt}
            loading={loading}
            draggable={draggable}
            className={cn("hidden md:block", imgClass, className)}
          />
        </>
      ) : (
        <img
          src={src ?? srcMobile ?? srcDesktop}
          alt={alt}
          loading={loading}
          draggable={draggable}
          className={cn(imgClass, className)}
        />
      )}
    </div>
  );
}
