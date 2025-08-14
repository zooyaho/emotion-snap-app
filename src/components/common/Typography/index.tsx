import { Text, TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

const typographyStyles = cva("", {
  variants: {
    variant: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      base: "text-base",
      md: "text-md",
      sm: "text-sm",
      xs: "text-xs",
      "2xs": "text-2xs",
    },
    weight: {
      regular: "font-binggrae",
      bold: "font-binggrae-bold",
    },
  },
  defaultVariants: {
    variant: "base",
    weight: "regular",
  },
});

type Variant = NonNullable<VariantProps<typeof typographyStyles>["variant"]>;
type Weight = "regular" | "bold" | "auto";

const isHeading = (v: Variant) =>
  v === "h1" || v === "h2" || v === "h3" || v === "h4" || v === "h5";

export default function Typography({
  variant = "base",
  weight = "auto",
  className,
  children,
  ...props
}: TextProps & { variant?: Variant; weight?: Weight }) {
  // auto → 헤딩은 bold, 나머지는 regular
  const resolvedWeight: "regular" | "bold" =
    weight === "auto" ? (isHeading(variant) ? "bold" : "regular") : weight;

  // 최종 className 생성
  const classes = typographyStyles({ variant, weight: resolvedWeight });

  return (
    <Text
      {...props}
      className={className ? `${classes} ${className}` : classes}
    >
      {children}
    </Text>
  );
}
