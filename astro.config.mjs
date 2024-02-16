import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), react(), icon()],
  devToolbar: {
    enabled: false,
  },
});
