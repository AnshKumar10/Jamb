import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { PageBuilderBlock, PagebuilderType } from "@/types";
import { getSpacingStyles } from "@/utils/spacing";
import { SanityImage } from "@/components/elements/sanity-image";
import { generateNavigationLinks } from "@/utils/navigation";

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
  allBlocks,
}: HeroProps) {
  const sanitized = {
    image: stegaClean(image),
    imageFill: stegaClean(imageFill),
    spacingMode: stegaClean(spacingMode),
    spacing: stegaClean(spacing),
    topSpacing: stegaClean(topSpacing),
    bottomSpacing: stegaClean(bottomSpacing),
  };
  const navigationLinks = generateNavigationLinks(allBlocks);

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
        <>
          <div className="h-full max-h-[800px]">
            <SanityImage
              className={imageClasses}
              fetchPriority="high"
              height={1500}
              image={sanitized.image}
              loading="eager"
              width={768}
            />
          </div>
          {navigationLinks.length > 0 && (
            <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-4">
              {navigationLinks.map((link, index) => (
                <div className="flex items-center gap-4 will-change-animate">
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      className:
                        "!text-[#9C9C9D] group link-effect hover:!no-underline !px-0 relative w-fit font-medium text-base capitalize leading-[25px] hover:after:origin-left hover:after:scale-x-100",
                    })}
                    href={link.href}
                  >
                    {link.label.toLowerCase()}
                  </Link>
                  {index < navigationLinks.length - 1 && (
                    <span className="text-[#9C9C9D]">|</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
