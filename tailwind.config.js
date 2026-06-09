const plugin = require("tailwindcss/plugin");
const { palettes, paletteToCssVars } = require("./src/theme/palette");
const { fonts } = require("./src/theme/font");

const lightPalette = palettes.light;

function buildColorScale(prefix, obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([k]) => k.startsWith(prefix))
      .map(([k, v]) => [k.replace(prefix, ""), v]),
  );
}

function buildFontComponents(fonts) {
  return Object.fromEntries(
    Object.entries(fonts).map(([key, value]) => [
      `.font-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
      {
        fontFamily: value.fontFamily,
        fontWeight: String(value.fontWeight),
        fontSize: `${value.fontSize}px`,
      },
    ]),
  );
}

function cssVar(name) {
  return `var(--color-${name})`;
}

const PRIMARY_SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function primaryScaleColors() {
  return Object.fromEntries(
    PRIMARY_SCALE_STEPS.map((step) => [String(step), cssVar(`primary-${step}`)]),
  );
}

function brandSemanticColors(prefix) {
  return {
    default: cssVar(`${prefix}-default`),
    hover: cssVar(`${prefix}-hover`),
    pressed: cssVar(`${prefix}-pressed`),
    disabled: cssVar(`${prefix}-disabled`),
    bg: cssVar(`${prefix}-bg`),
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.js"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      bold: ["Graphie-Bold"],
      boldItalic: ["Graphie-BoldItalic"],
      book: ["Graphie-Book"],
      bookItalic: ["Graphie-BookItalic"],
      extraBold: ["Graphie-ExtraBold"],
      extraBoldItalic: ["Graphie-ExtraBoldItalic"],
      extraLight: ["Graphie-ExtraLight"],
      extraLightItalic: ["Graphie-ExtraLightItalic"],
      italic: ["Graphie-Italic"],
      light: ["Graphie-Light"],
      lightItalic: ["Graphie-LightItalic"],
      regular: ["Graphie-Regular"],
      semiBold: ["Graphie-SemiBold"],
      semiBoldItalic: ["Graphie-SemiBoldItalic"],
      thin: ["Graphie-Thin"],
    },
    extend: {
      colors: {
        gray: buildColorScale("gray", lightPalette),
        primary: {
          ...primaryScaleColors(),
          ...brandSemanticColors("primary"),
        },
        secondary: brandSemanticColors("secondary"),
        success: buildColorScale("success", lightPalette),
        warning: buildColorScale("warning", lightPalette),
        red: buildColorScale("red", lightPalette),

        background: {
          surface: cssVar("background-surface"),
          main: cssVar("background-main"),
          primary: cssVar("background-primary"),
          secondary: cssVar("background-secondary"),
          static: cssVar("background-static"),
          action: {
            default: cssVar("background-action-default"),
          },
        },
        text: {
          primary: cssVar("text-primary"),
          secondary: cssVar("text-secondary"),
          disabled: cssVar("text-disabled"),
          button: {
            primary: cssVar("text-button-primary"),
            secondary: cssVar("text-button-secondary"),
          },
        },
        icon: {
          primary: cssVar("icon-primary"),
          secondary: cssVar("icon-secondary"),
          default: cssVar("icon-default"),
          disabled: cssVar("icon-disabled"),
          default_active: cssVar("icon-default-active"),
        },
        input: {
          border: cssVar("input-border"),
          borderFocused: cssVar("input-border-focused"),
          placeholder: cssVar("input-placeholder"),
        },

        overlay: lightPalette.overlay,
        bg: cssVar("bg"),
        star: lightPalette.star,
        hyperlink: lightPalette.hyperlink,
        hyperlinkBg: lightPalette.hyperlinkBg,
        "gray-overlay": "rgba(255,255,255,0.4)",
      },
    },
  },
  plugins: [
    plugin(({ addBase, addComponents, matchUtilities }) => {
      addBase({
        ":root": paletteToCssVars(lightPalette),
      });

      addComponents(buildFontComponents(fonts));

      addComponents({
        ".input-text": {
          fontFamily: fonts.input.fontFamily,
          fontWeight: String(fonts.input.fontWeight),
          fontSize: `${fonts.input.fontSize}px`,
          height: "48px",
          paddingHorizontal: "16px",
          borderWidth: "1px",
          borderRadius: "8px",
          color: lightPalette.text.primary,
        },
        ".label-text": {
          fontFamily: fonts.textXsRegular.fontFamily,
          fontWeight: String(fonts.textXsRegular.fontWeight),
          fontSize: `${fonts.textXsRegular.fontSize}px`,
          marginBottom: "9px",
          color: lightPalette.text.primary,
        },
      });

      matchUtilities({
        "pt-inset": () => ({ paddingTop: "var(--inset-top)" }),
        "pb-inset": () => ({ paddingBottom: "var(--inset-bottom)" }),
        "pl-inset": () => ({ paddingLeft: "var(--inset-left)" }),
        "pr-inset": () => ({ paddingRight: "var(--inset-right)" }),
        "mt-inset": () => ({ marginTop: "var(--inset-top)" }),
        "mb-inset": () => ({ marginBottom: "var(--inset-bottom)" }),
        "ml-inset": () => ({ marginLeft: "var(--inset-left)" }),
        "mr-inset": () => ({ marginRight: "var(--inset-right)" }),
      });
    }),
  ],
};
