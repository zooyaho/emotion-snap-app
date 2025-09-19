import type { Href } from "expo-router";

/** ROUTE PATH */
export const HREF = {
  tabs: {
    home: "/home" as Href,
    stats: "/stats" as Href,
    history: "/history" as Href,
    settings: "/settings" as Href,
  },
  mood: {
    add: "/mood/add" as Href,
    edit: (id: string | number): Href => `/mood/edit/${id}` as Href,
  },
} as const;

/** ROUTE NAME */
export const ROUTE_NAME = {
  // Root Stack 그룹
  GROUP: {
    TABS: "(tabs)",
    MOOD: "mood",
  },
  // (tabs) 내부
  TABS: {
    HOME: "home",
    STATS: "stats",
    ADD: "add",
    HISTORY: "history",
    SETTINGS: "settings",
  },
  // mood 그룹 내부 (mood/_layout.tsx 기준, 상대 경로 이름)
  MOOD: {
    ADD: "add",
    DETAIL: "[moodId]",
    EDIT: "edit/[moodId]",
  },
} as const;

export type TabRouteNameType =
  (typeof ROUTE_NAME.TABS)[keyof typeof ROUTE_NAME.TABS];
export type MoodRouteNameType =
  (typeof ROUTE_NAME.MOOD)[keyof typeof ROUTE_NAME.MOOD];
