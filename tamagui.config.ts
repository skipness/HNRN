import { createTamagui } from "tamagui";
import { createMedia } from "@tamagui/react-native-media-driver";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";
import { createInterFont } from "@tamagui/font-inter";
import { createAnimations } from "@tamagui/animations-moti";

const interFont = createInterFont({
  face: {
    300: { normal: "Inter", italic: "InterItalic" },
    bold: { normal: "InterBold" },
  },
});

const animations = createAnimations({
  lazy: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
});

const config = createTamagui({
  animations,
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  }),
});

export type AppConfig = typeof config;
declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {}
}
export default config;
