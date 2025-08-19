import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스 안전 병합 유틸
 * - 중복 클래스 자동 제거 (예: "px-2 px-4" → "px-4")
 * - 조건부 클래스 지원 (falsy 값 무시)
 * - IDE 자동완성 지원
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
