/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color-rgb)",
        primary: "var(--primary-text-color-rgb)",
        secondary: "var(--secondary-text-color-rgb)",
        accent1: "var(--accent-color-1-rgb)",
        accent2: "var(--accent-color-2-rgb)",
        link: "var(--link-color-rgb)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme, e }) {
      const colors = theme("colors");
      const alphas = [
        0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
        0.7, 0.75, 0.8, 0.85, 0.9, 0.95,
      ];
      const newUtilities = {};

      Object.keys(colors).forEach((colorKey) => {
        const color = colors[colorKey];

        // Add default class for 100% opacity
        const classNameBgDefault = `bg-${e(colorKey)}`;
        const classNameTextDefault = `text-${e(colorKey)}`;
        const classNameBorderDefault = `border-${e(colorKey)}`;

        newUtilities[`.${classNameBgDefault}`] = {
          backgroundColor: `rgb(${color})`, // Full opacity
        };
        newUtilities[`.${classNameTextDefault}`] = {
          color: `rgb(${color})`, // Full opacity
        };
        newUtilities[`.${classNameBorderDefault}`] = {
          borderColor: `rgb(${color})`, // Full opacity
        };

        // Generate classes for alpha values
        alphas.forEach((alpha) => {
          const alphaValue = Math.round(alpha * 100);
          const classNameBg = `bg-${e(`${colorKey}-${alphaValue}`)}`;
          const classNameText = `text-${e(`${colorKey}-${alphaValue}`)}`;
          const classNameBorder = `border-${e(`${colorKey}-${alphaValue}`)}`;

          newUtilities[`.${classNameBg}`] = {
            backgroundColor: `rgba(${color}, ${alpha})`,
          };
          newUtilities[`.${classNameText}`] = {
            color: `rgba(${color}, ${alpha})`,
          };
          newUtilities[`.${classNameBorder}`] = {
            borderColor: `rgba(${color}, ${alpha})`,
          };
        });
      });

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
