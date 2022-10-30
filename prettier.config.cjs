/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: false,
  singleQuote: false,
  printWidth: 120,
  tabWidth: 2,
  endOfLine: "auto",
  // import order config: https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports
  importOrder: ["^[./](?!.*[.]s?css$).*$", ".*[.](s?css)$"],
  importOrderSeparation: true, // adds new line between each import declaration group
  importOrderSortSpecifiers: true, // sorts each specifier within a single import`
}
