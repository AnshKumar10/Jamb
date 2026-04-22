"use client";

import { cn } from "@workspace/ui/lib/utils";
import { stegaClean } from "next-sanity";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SanityButtons } from "@/components/elements/sanity-buttons";
import { SanityImage } from "@/components/elements/sanity-image";
import type { PagebuilderType } from "@/types";
import { convertToSlug } from "@/utils";
import { getSpacingStyles } from "@/utils/spacing";

type SplitFeatureSectionProps = PagebuilderType<"splitFeatureSection">;
type SplitFeatureSectionImageProps = {
  image: SplitFeatureSectionProps["image"];
  imageFill: SplitFeatureSectionProps["imageFill"];
};

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: easing,
    },
  },
};

const imageVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: easing,
    },
  },
};

function getSlugSource(
  navigationSlugField: SplitFeatureSectionProps["navigationSlugField"],
  headline: SplitFeatureSectionProps["headline"],
  title: SplitFeatureSectionProps["title"],
): string {
  const cleanNavigationSlugField = stegaClean(navigationSlugField);
  const cleanHeadline = stegaClean(headline);
  const cleanTitle = stegaClean(title);

  return cleanNavigationSlugField === "headline"
    ? (cleanHeadline ?? "")
    : cleanTitle;
}

export default function SplitFeatureSection({
  headline,
  title,
  description,
  image,
  backgroundColor = "#DFDAD7",
  customBackgroundColor,
  imageFill = "cover",
  desktopLayoutDirection = "row",
  mobileLayoutDirection = "column",
  buttons,
  ctaLayout = "row",
  spacingMode,
  spacing,
  padding,
  topSpacing,
  bottomSpacing,
  navigationSlugField,
}: SplitFeatureSectionProps) {

  
  const cleanBackgroundColor = stegaClean(backgroundColor);
  const cleanDesktopLayoutDirection = stegaClean(desktopLayoutDirection);
  const cleanMobileLayoutDirection = stegaClean(mobileLayoutDirection);
  const cleanCTALayout = stegaClean(ctaLayout);
  const cleanImageFill = stegaClean(imageFill);
  const cleanSpacingMode = stegaClean(spacingMode);
  const cleanSpacing = stegaClean(spacing);
  const cleanTopSpacing = stegaClean(topSpacing);
  const cleanBottomSpacing = stegaClean(bottomSpacing);
  const cleanPadding = stegaClean(padding);

  const actualBackgroundColor =
    cleanBackgroundColor === "custom" && customBackgroundColor
      ? stegaClean(customBackgroundColor)
      : cleanBackgroundColor;

  const slugSource = getSlugSource(
    navigationSlugField ?? "title",
    headline,
    title,
  );

  return (
    <section
      className={cn("scroll-my-20 py-9", cleanPadding === "large" && "py-32")}
      {...(slugSource && { id: convertToSlug(slugSource) })}
      style={{
        backgroundColor: actualBackgroundColor,
        ...getSpacingStyles({
          spacingMode: cleanSpacingMode,
          spacing: cleanSpacing,
          topSpacing: cleanTopSpacing,
          bottomSpacing: cleanBottomSpacing,
        }),
      }}
    >
      <motion.div
        className="container mx-auto grid gap-10 px-4 sm:gap-12 md:grid-cols-2 md:gap-14 lg:gap-16"
        style={{ "--max-w": "1336px" } as React.CSSProperties}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          className="order-(--order-mobile) flex min-w-0 flex-col justify-center gap-4 will-change-animate sm:gap-5 md:order-(--order-desktop)"
          style={
            {
              "--order-mobile": cleanMobileLayoutDirection === "column" ? 1 : 2,
              "--order-desktop": cleanDesktopLayoutDirection === "row" ? 1 : 2,
            } as React.CSSProperties
          }
        >
          {headline && (
            <motion.p
              variants={item}
              className="min-w-0 break-words text-center font-medium text-sm uppercase leading-[25px] will-change-animate lg:text-base"
            >
              {headline}
            </motion.p>
          )}

          <motion.h2
            variants={item}
            className="mx-auto min-w-0 max-w-[22ch] text-balance break-words text-center font-medium text-3xl leading-[48px] will-change-animate sm:text-2xl lg:text-4xl"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto min-w-0 max-w-[47ch] break-words font-medium text-sm leading-[25px] will-change-animate lg:text-base"
          >
            {description}
          </motion.p>

          {buttons && buttons.length > 0 && (
            <motion.div
              variants={item}
              className="mx-auto mt-3 flex w-fit gap-2 will-change-animate"
            >
              <SanityButtons
                buttonClassName="border-[#737373] px-6 text-[#737373] w-fit hover:bg-muted/50"
                buttons={buttons}
                className={cn(
                  cleanCTALayout === "column" &&
                    "flex flex-col items-center justify-center gap-2 sm:flex-col",
                  cleanCTALayout === "row" && "flex flex-row gap-2 sm:flex-row",
                )}
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="order-(--order-mobile) h-full will-change-animate md:order-(--order-desktop)"
          style={
            {
              "--order-mobile": cleanMobileLayoutDirection === "column" ? 2 : 1,
              "--order-desktop": cleanDesktopLayoutDirection === "row" ? 2 : 1,
            } as React.CSSProperties
          }
          variants={imageVariant}
        >
          <SplitFeatureSectionImage image={image} imageFill={cleanImageFill} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SplitFeatureSectionImage({
  image,
  imageFill = "cover",
}: SplitFeatureSectionImageProps) {
  if (!image?.id) return null;

  return (
    <SanityImage
      alt={image.alt || ""}
      className={cn(
        "h-auto max-h-[731px] w-full",
        imageFill === "contain" && "object-contain",
        imageFill === "cover" && "object-cover",
      )}
      height={731}
      image={image}
      width={583}
    />
  );
}
