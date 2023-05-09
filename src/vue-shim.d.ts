/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
  }
}
