// Copyright © 2021 Paul Tavitian

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag-next";

createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, { property: { id: "UA-122946443-40" } })
  .mount("#app");
