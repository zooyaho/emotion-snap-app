import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";
import { tokens } from "./color-theme";

const full = resolveConfig(tailwindConfig);
export const tw = (full.theme?.colors || {}) as any;

const VAR_RE = /^var\((--[a-z0-9-]+)\)$/i;

export function resolveCssVar(
  val: string | undefined,
  scheme: "light" | "dark" | null | undefined
) {
  if (!val || typeof val !== "string") return val;
  const m = val.match(VAR_RE);
  if (!m) return val;
  const key = m[1];
  const table = scheme === "dark" ? tokens.dark : tokens.light;
  const hex = table[key];

  return hex ?? val; // 못 찾으면 원본 반환
}

export function getTabColors(scheme: "light" | "dark" | null | undefined) {
  // tw.primary[500] 등이 var(...) 문자열이므로 실제 hex로 변환
  const activeVar = tw.primary?.[500];
  const inactiveVar = tw.neutral?.[300];
  const backgroundVar = tw.neutral?.[50];

  return {
    active: resolveCssVar(activeVar, scheme),
    inactive: resolveCssVar(inactiveVar, scheme),
    background: resolveCssVar(backgroundVar, scheme),
  };
}
