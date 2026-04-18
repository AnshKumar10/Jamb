import { cn } from "@workspace/ui/lib/utils";
import { stegaClean } from "next-sanity";
import { SanityImage } from "@/components/elements/sanity-image";
import type { PageBuilderBlock, PagebuilderType } from "@/types";
import { getSpacingStyles } from "@/spacing";

type HeroProps = PagebuilderType<"hero"> & {
  allBlocks: PageBuilderBlock[];
};

export default function Hero({
  image,
  imageFill,
  spacingMode,
  spacing,
  topSpacing,
  bottomSpacing,
}: HeroProps) {
  const sanitized = {
    image: stegaClean(image),
    imageFill: stegaClean(imageFill),
    spacingMode: stegaClean(spacingMode),
    spacing: stegaClean(spacing),
    topSpacing: stegaClean(topSpacing),
    bottomSpacing: stegaClean(bottomSpacing),
  };

  const spacingStyles = getSpacingStyles({
    spacingMode: sanitized.spacingMode,
    spacing: sanitized.spacing,
    topSpacing: sanitized.topSpacing,
    bottomSpacing: sanitized.bottomSpacing,
  });

  const imageClasses = cn(
    "size-full max-h-[800px]",
    sanitized.imageFill === "contain" && "object-contain",
    sanitized.imageFill === "cover" && "object-cover",
  );

  return (
    <section className="container mx-auto px-4 sm:px-6" style={spacingStyles}>
      {sanitized.image?.id && (
        <div>
          <SanityImage
            className={imageClasses}
            fetchPriority="high"
            height={1500}
            image={sanitized.image}
            loading="eager"
            width={768}
          />
        </div>
      )}
    </section>
  );
}