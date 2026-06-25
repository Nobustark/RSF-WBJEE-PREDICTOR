/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "surface": "#fff8f6",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#e5e2dd",
        "primary-fixed": "#ffdad4",
        "surface-variant": "#fedad5",
        "surface-container-high": "#ffe2dd",
        "inverse-surface": "#412b28",
        "tertiary-fixed-dim": "#c9c6c2",
        "on-tertiary-container": "#efece8",
        "outline": "#936e68",
        "secondary-container": "#e2dfde",
        "inverse-primary": "#ffb4a8",
        "secondary": "#5f5e5e",
        "primary": "#aa0000",
        "inverse-on-surface": "#ffedea",
        "primary-container": "#d80000",
        "on-primary": "#ffffff",
        "surface-bright": "#fff8f6",
        "surface-container-highest": "#fedad5",
        "on-secondary-fixed": "#1c1b1b",
        "on-tertiary-fixed-variant": "#474743",
        "on-primary-fixed-variant": "#930000",
        "outline-variant": "#e8bcb5",
        "secondary-fixed": "#e5e2e1",
        "on-surface-variant": "#5e3f3a",
        "on-primary-container": "#ffe7e3",
        "tertiary": "#54534f",
        "surface-container-low": "#fff0ee",
        "secondary-fixed-dim": "#c8c6c5",
        "error": "#ba1a1a",
        "on-secondary-fixed-variant": "#474746",
        "surface-container": "#ffe9e6",
        "on-surface": "#291714",
        "surface-container-lowest": "#ffffff",
        "on-background": "#291714",
        "surface-dim": "#f5d2cc",
        "on-primary-fixed": "#410000",
        "on-tertiary-fixed": "#1c1c19",
        "on-secondary": "#ffffff",
        "tertiary-container": "#6c6b67",
        "surface-tint": "#c00000",
        "on-tertiary": "#ffffff",
        "on-secondary-container": "#636262",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#ffb4a8",
        "on-error-container": "#93000a",
        "background": "#fff8f6"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "stack-sm": "1rem",
        "gutter": "1.5rem",
        "grid-margin": "2rem",
        "stack-lg": "4rem",
        "border-thick": "4px",
        "border-ultra": "8px"
      },
      "fontFamily": {
        "label-bold": ["Space Grotesk", "sans-serif"],
        "headline-lg": ["Montserrat", "sans-serif"],
        "headline-md": ["Montserrat", "sans-serif"],
        "body-lg": ["Work Sans", "sans-serif"],
        "display-xl": ["Montserrat", "sans-serif"],
        "headline-lg-mobile": ["Montserrat", "sans-serif"],
        "body-md": ["Work Sans", "sans-serif"]
      },
      "fontSize": {
        "label-bold": ["14px", { "lineHeight": "16px", "fontWeight": "700" }],
        "headline-lg": ["64px", { "lineHeight": "68px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "headline-md": ["32px", { "lineHeight": "36px", "fontWeight": "700" }],
        "body-lg": ["20px", { "lineHeight": "30px", "fontWeight": "400" }],
        "display-xl": ["120px", { "lineHeight": "110px", "letterSpacing": "-0.04em", "fontWeight": "900" }],
        "headline-lg-mobile": ["42px", { "lineHeight": "44px", "fontWeight": "800" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
