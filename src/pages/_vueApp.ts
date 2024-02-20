import { VueQueryPlugin } from "@tanstack/vue-query";
import type { App } from "vue";

export default (app: App) => {
  app.use(VueQueryPlugin);
};
