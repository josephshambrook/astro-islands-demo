import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    // as React and Solid use `.tsx` files, we can add a prefix to
    // the filenames to specify which library to use
    react({
      include: ["**/*.react.*"],
    }),
    tailwind(),
    icon(),
    vue({ appEntrypoint: "/src/pages/_vueApp" }),
  ],
  devToolbar: {
    enabled: false,
  },
});
