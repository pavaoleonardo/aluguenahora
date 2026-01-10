module.exports = {
  content: [
    './src/app/(site)/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false, // Desabilita reset global do Tailwind
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
