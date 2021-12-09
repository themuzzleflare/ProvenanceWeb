// Copyright © 2021 Paul Tavitian

/* eslint-disable */
import axios from "axios";
import { Store } from "vuex";
import { State } from "@/constants";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: typeof axios;
    $store: Store<State>;
  }
}
