import { Hero } from "@workspace/sanity/types";

export const getSpacingValue = (spacing: Hero["spacing"]): string => {
  switch (spacing) {
    case "none":
      return "0";
    case "sm":
      return "1rem";
    case "md":
      return "1.5rem";
    case "lg":
      return "2.25rem";
    case "xl":
      return "3rem";
    case "2xl":
      return "4rem";
    case "3xl":
      return "5rem";
    case "4xl":
      return "6rem";
    default:
      return "2.25rem";
  }
};

export const getSpacingStyles = (props: {
  spacingMode?: "same" | "separate";
  spacing?: Hero["spacing"];
  topSpacing?: Hero["topSpacing"];
  bottomSpacing?: Hero["bottomSpacing"];
}) => {
  const { spacingMode, spacing, topSpacing, bottomSpacing } = props;

  if (spacingMode === "separate") {
    return {
      marginTop: getSpacingValue(topSpacing || "lg"),
      marginBottom: getSpacingValue(bottomSpacing || "lg"),
    };
  }

  const value = getSpacingValue(spacing || "lg");
  return {
    marginBlock: value,
  };
};
