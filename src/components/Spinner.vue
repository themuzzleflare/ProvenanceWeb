<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div id="spinner" class="d-flex justify-content-center mt-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class Spinner extends Vue {}
</script>
