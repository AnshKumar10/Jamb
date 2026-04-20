import { stegaClean } from "next-sanity";
import { convertToSlug } from "@/utils";
import { PageBuilderBlock } from "@/components/pagebuilder";

export type NavigationLink = {
  label: string;
  href: string;
};

function getSplitFeatureSectionNavigationLink(
  block: PageBuilderBlock,
): NavigationLink | null {
  if (block._type !== "splitFeatureSection") {
    return null;
  }

  const navigationSlugField = block?.navigationSlugField
    ? stegaClean(block.navigationSlugField)
    : "title";

  let slugSource: string | null = null;

  if (navigationSlugField === "headline" && "headline" in block) {
    const headlineValue = stegaClean(block.headline);
    slugSource = headlineValue ?? null;
  } else if ("title" in block && block?.title) {
    const titleValue = stegaClean(block.title);
    slugSource = titleValue ?? null;
  }

  if (!slugSource) {
    return null;
  }

  const slug = convertToSlug(slugSource);
  return {
    label: slugSource,
    href: `#${slug}`,
  };
}

function getImageGridNavigationLink(
  block: PageBuilderBlock,
): NavigationLink | null {
  if (block._type !== "imageGrid" || !("title" in block) || !block.title) {
    return null;
  }

  const cleanTitle = stegaClean(block.title);
  if (!cleanTitle) {
    return null;
  }

  const slug = convertToSlug(cleanTitle);
  return {
    label: cleanTitle,
    href: `#${slug}`,
  };
}

export function generateNavigationLinks(
  blocks: PageBuilderBlock[],
): NavigationLink[] {
  const links: NavigationLink[] = [];

  for (const block of blocks) {
    if (
      (block._type === "splitFeatureSection" || block._type === "imageGrid") &&
      "allowNavigation" in block &&
      block.allowNavigation === true
    ) {
      let link: NavigationLink | null = null;

      if (block._type === "splitFeatureSection") {
        link = getSplitFeatureSectionNavigationLink(block);
      } else if (block._type === "imageGrid") {
        link = getImageGridNavigationLink(block);
      }

      if (link) {
        links.push(link);
      }
    }
  }

  return links;
}
