import { cn } from "@/lib/utils";

export type StoreImageVariant =
  | "banner"
  | "product-hero"
  | "product-thumb"
  | "section-banner"
  | "section-content"
  | "section-full";

const variantStyles: Record<
  StoreImageVariant,
  { frame: string; padding: string; fill?: boolean; intrinsic?: boolean; radius: string }
> = {
  banner: {
    frame: "aspect-[4/5] w-full md:aspect-[21/9] md:max-h-none",
    padding: "p-0",
    fill: true,
    radius: "",
  },
  "product-hero": {
    frame: "aspect-square w-full",
    padding: "p-0",
    fill: true,
    radius: "rounded-2xl",
  },
  "product-thumb": {
    frame: "h-full w-full aspect-square",
    padding: "p-0",
    fill: true,
    radius: "rounded-xl",
  },
  "section-banner": {
    frame: "aspect-[4/5] w-full md:aspect-[21/9]",
    padding: "p-0",
    fill: true,
    radius: "",
  },
  "section-content": {
    frame: "aspect-video w-full md:aspect-[3/2]",
    padding: "p-0",
    radius: "rounded-2xl",
  },
  "section-full": {
    frame: "w-full",
    padding: "p-0",
    intrinsic: true,
    radius: "rounded-2xl",
  },
};

const imgContain = "max-h-full max-w-full object-contain object-center";
const imgIntrinsic = "w-full h-auto object-contain object-center";
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
  const intrinsic = styles.intrinsic ?? false;
  const radius = styles.radius;
  const imgClass = cn(
    fill ? imgFill : intrinsic ? imgIntrinsic : imgContain,
    radius,
  );

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        !fill && !intrinsic && "flex items-center justify-center",
        radius,
        styles.frame,
        styles.padding,
        frameClassName,
      )}
      style={bg ? { backgroundColor: bg } : undefined}
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
