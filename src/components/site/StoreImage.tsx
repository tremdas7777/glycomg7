import { cn } from "@/lib/utils";

export type StoreImageVariant =
  | "banner"
  | "product-hero"
  | "product-thumb"
  | "section-banner"
  | "section-content";

const variantStyles: Record<
  StoreImageVariant,
  { frame: string; padding: string; fill?: boolean }
> = {
  banner: {
    frame: "aspect-[4/5] w-full md:aspect-[21/9] md:max-h-none",
    padding: "p-0",
    fill: true,
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
    frame: "aspect-[4/5] w-full md:aspect-[21/9]",
    padding: "p-0",
    fill: true,
  },
  "section-content": {
    frame: "aspect-video w-full md:aspect-[3/2]",
    padding: "p-1 sm:p-2 md:p-4",
  },
};

const imgContain = "max-h-full max-w-full object-contain object-center";
const imgFill = "absolute inset-0 h-full w-full object-cover object-center";

type StoreImageProps = {
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
  const fill = styles.fill ?? false;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        !fill && "flex items-center justify-center",
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
            className={cn("md:hidden", fill ? imgFill : imgContain, className)}
          />
          <img
            src={srcDesktop}
            alt={alt}
            loading={loading}
            draggable={draggable}
            className={cn("hidden md:block", fill ? imgFill : imgContain, className)}
          />
        </>
      ) : (
        <img
          src={src ?? srcMobile ?? srcDesktop}
          alt={alt}
          loading={loading}
          draggable={draggable}
          className={cn(fill ? imgFill : imgContain, className)}
        />
      )}
    </div>
  );
}
