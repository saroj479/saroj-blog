/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require("tailwindcss"),
    require("cssnano")({
      preset: "default",
    }),
  ],
}

export default config
