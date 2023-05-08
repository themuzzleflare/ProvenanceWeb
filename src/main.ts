// Copyright © 2021-2022 Paul Tavitian

import { createApp } from 'vue'
import App from '@/App.vue'
import VueGtag from 'vue-gtag-next'
import { axiosInstance } from '@/constants'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueGtag, { property: { id: 'UA-122946443-40' } })

app.config.globalProperties.$http = axiosInstance
app.mount('#app')
