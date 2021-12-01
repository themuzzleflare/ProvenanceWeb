// Copyright © 2021 Paul Tavitian

import { createApp } from "vue";
import store from "@/store";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueGtag from "vue-gtag-next";
import axios from "axios";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, { property: { id: "UA-122946443-40" } });

app.config.globalProperties.$http = axios;
app.mount("#app");
