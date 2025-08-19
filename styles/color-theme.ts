import { vars } from "nativewind";

export const tokens: Record<"light" | "dark", Record<string, string>> = {
  light: {
    // primary
    "--color-primary-50": "253 225 235", // #FDE1EB
    "--color-primary-100": "245 192 210", // #F5C0D2
    "--color-primary-200": "242 163 189", // #F2A3BD
    "--color-primary-300": "226 122 156", // #E27A9C
    "--color-primary-400": "212 98 135", // #D46287
    "--color-primary-500": "200 71 113", // #C84771
    "--color-primary-600": "188 48 93", // #BC305D

    // neutral
    "--color-neutral-50": "244 243 245", //  #F4F3F5
    "--color-neutral-100": "230 229 234", //  #E6E5EA
    "--color-neutral-200": "199 197 205", // #C7C5CD
    "--color-neutral-300": "131 129 142", // #83818E
    "--color-neutral-400": "79 78 89", // #4F4E59
    "--color-neutral-500": "43 42 49", // #2B2A31
    "--color-neutral-600": "20 20 23", // #141417

    // danger
    "--color-danger-20": "252 242 242", // #FCF2F2
    "--color-danger-50": "249 227 227", // #F9E3E3
    "--color-danger-100": "239 168 168", //  #EFA8A8
    "--color-danger-200": "235 140 140", //  #EB8C8C
    "--color-danger-300": "226 96 96", //  #E26060
    "--color-danger-400": "217 73 73", //  #D94949
    "--color-danger-500": "201 43 43", //  #C92B2B
    "--color-danger-600": "180 19 19", //  #B41313

    // background
    "--color-background": "249 249 251", // #F9F9FB
  },
  dark: {
    // primary
    "--color-primary-50": "61 39 49", // #3D2731
    "--color-primary-100": "82 49 62", // #52313E
    "--color-primary-200": "123 69 88", // #7B4558
    "--color-primary-300": "144 78 101", // #904E65
    "--color-primary-400": "186 98 127", // #BA627F
    "--color-primary-500": "227 117 153", // #E37599
    "--color-primary-600": "241 147 178", // #F193B2

    // neutral
    "--color-neutral-50": "32 31 38", // #201F26
    "--color-neutral-100": "66 64 77", // #42404D
    "--color-neutral-200": "97 95 109", // #615F6D
    "--color-neutral-300": "122 120 135", // #7A7887
    "--color-neutral-400": "164 162 180", // #A4A2B4
    "--color-neutral-500": "224 222 234", // #E0DEEA
    "--color-neutral-600": "234 233 242", // #EAE9F2

    // danger
    "--color-danger-20": "47 26 29", // #2F1A1D
    "--color-danger-50": "50 29 32", // #321D20
    "--color-danger-100": "79 39 41", // #4F2729
    "--color-danger-200": "119 51 53", // #773335
    "--color-danger-300": "139 58 59", // #8B3A3B
    "--color-danger-400": "178 70 71", // #B24647
    "--color-danger-500": "218 83 83", // #DA5353
    "--color-danger-600": "233 111 111", // #E96F6F

    // background
    "--color-background": "20 20 23", // #141417
  },
};

export const themes = {
  light: vars(tokens.light),
  dark: vars(tokens.dark),
};
