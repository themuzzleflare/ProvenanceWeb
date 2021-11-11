<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div class="page-not-found">
    <h1>Page Not Found</h1>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class PageNotFound extends Vue {}
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
