// @ts-check
import { defineConfig, envField } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind()],
  output: "server",
  env: {
    schema: {
      API_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      API_SECRET: envField.string({ context: "server", access: "secret" }),
    },
  },
});
