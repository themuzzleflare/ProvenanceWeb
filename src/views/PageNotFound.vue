<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div class="page-not-found">
    <h1>{{ error?.name ?? "Error" }}</h1>
    <h4>{{ error?.message ?? "Page Not Found" }}</h4>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    error: Error,
  },
})
export default class PageNotFound extends Vue {
  error?: Error;
}
</script>

<style lang="scss" scoped>
.page-not-found {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 50px;
}
</style>
