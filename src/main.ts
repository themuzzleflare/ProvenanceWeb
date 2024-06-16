/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueGtag from 'vue-gtag-next'

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueGtag, { property: { id: 'UA-122946443-40' } })

app.mount('#app')
