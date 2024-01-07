module.exports = {
  plugins: [require.resolve("prettier-plugin-astro"), "prettier-plugin-svelte"],

  // added due to an upstream issue with pnpm
  // https://github.com/withastro/prettier-plugin-astro#pnpm-support-1
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
