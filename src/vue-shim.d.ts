/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

export {}

import 'vue-router'

declare module 'vue-router' {
  // noinspection JSUnusedGlobalSymbols
  interface RouteMeta {
    title?: string
    description?: string
  }
}
