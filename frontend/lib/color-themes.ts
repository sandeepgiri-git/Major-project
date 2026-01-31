export const colorThemes = {
  default: {
    name: "Default",
    colors: {
      primary: "oklch(0.205 0 0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      accent: "oklch(0.97 0 0)",
    },
  },
  purple: {
    name: "Purple",
    colors: {
      primary: "oklch(0.5 0.15 290)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.7 0.1 290)",
      accent: "oklch(0.6 0.12 290)",
    },
  },
  blue: {
    name: "Blue",
    colors: {
      primary: "oklch(0.5 0.15 240)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.7 0.1 240)",
      accent: "oklch(0.6 0.12 240)",
    },
  },
  green: {
    name: "Green",
    colors: {
      primary: "oklch(0.5 0.15 150)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.7 0.1 150)",
      accent: "oklch(0.6 0.12 150)",
    },
  },
  orange: {
    name: "Orange",
    colors: {
      primary: "oklch(0.6 0.15 50)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.75 0.1 50)",
      accent: "oklch(0.65 0.12 50)",
    },
  },
  rose: {
    name: "Rose",
    colors: {
      primary: "oklch(0.55 0.15 10)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.72 0.1 10)",
      accent: "oklch(0.62 0.12 10)",
    },
  },
  cyan: {
    name: "Cyan",
    colors: {
      primary: "oklch(0.55 0.15 200)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.72 0.1 200)",
      accent: "oklch(0.62 0.12 200)",
    },
  },
  amber: {
    name: "Amber",
    colors: {
      primary: "oklch(0.6 0.15 80)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.75 0.1 80)",
      accent: "oklch(0.65 0.12 80)",
    },
  },
}

export type ColorThemeKey = keyof typeof colorThemes
