import { cn } from "@/lib/utils";

export type StoreImageVariant =
  | "banner"
  | "product-hero"
  | "product-thumb"
  | "section-banner"
  | "section-content";

const variantStyles: Record<StoreImageVariant, { frame: string; padding: string }> = {
  banner: {
    frame: "aspect-[4/5] w-full md:aspect-[21/9]",
    padding: "p-2 sm:p-3 md:p-4",
  },
  "product-hero": {
    frame: "aspect-[4/5] w-full md:aspect-[21/9]",
    padding: "p-2 sm:p-3 md:p-4",
  },
  "product-thumb": {
    frame: "aspect-square w-full md:aspect-[4/3]",
    padding: "p-0.5",
  },
  "section-banner": {
    frame: "aspect-[4/5] w-full md:aspect-[21/9]",
    padding: "p-2 sm:p-3 md:p-4",
  },
  "section-content": {
    frame: "aspect-[4/5] w-full md:aspect-[3/2]",
    padding: "p-2 md:p-4",
  },
};

const imgClass = "max-h-full max-w-full object-contain object-center";

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
          <picture className="flex max-h-full max-w-full items-center justify-center md:hidden">
            <img
              src={srcMobile}
              alt={alt}
              loading={loading}
              draggable={draggable}
              className={cn(imgClass, className)}
            />
          </picture>
          <picture className="hidden max-h-full max-w-full items-center justify-center md:flex">
            <img
              src={srcDesktop}
              alt={alt}
              loading={loading}
              draggable={draggable}
              className={cn(imgClass, className)}
            />
          </picture>
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
