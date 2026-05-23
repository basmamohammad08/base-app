const plugin = require("tailwindcss/plugin");
const { palette } = require("./src/theme/palette");
const { fonts } = require("./src/theme/font");

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
      `.font-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, // camelCase -> kebab-case
      {
        fontFamily: value.fontFamily,
        fontWeight: String(value.fontWeight),
        fontSize: `${value.fontSize}px`,
      },
    ]),
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.js"],
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
        gray: buildColorScale("gray", palette),
        primary: {
          ...buildColorScale("primary", palette),
          ...palette.primary,
        },
        secondary: buildColorScale("secondary", palette),
        success: buildColorScale("success", palette),
        warning: buildColorScale("warning", palette),
        red: buildColorScale("red", palette),

        background: palette.background,
        text: palette.text,
        icon: palette.icon,
        poweredBy: palette.poweredBy,

        overlay: palette.overlay,
        bg: palette.bg,
        star: palette.star,
        hyperlink: palette.hyperlink,
        hyperlinkBg: palette.hyperlinkBg,
        "gray-overlay": "rgba(255,255,255,0.4)",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, matchUtilities }) => {
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
          color: palette.white,
        },
        ".label-text": {
          fontFamily: fonts.textXsRegular.fontFamily,
          fontWeight: String(fonts.textXsRegular.fontWeight),
          fontSize: `${fonts.textXsRegular.fontSize}px`,
          marginBottom: "9px",
          color: palette.white,
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
