import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "~/router";
import "~/router/router-guard";
import "ant-design-vue/dist/reset.css";
import "~/assets/styles/reset.css";
import "uno.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.mount("#app");
