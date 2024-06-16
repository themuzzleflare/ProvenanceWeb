<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script setup lang="ts">
const props = defineProps<{
  error?: Error
}>()
</script>

<template>
  <div class="page-not-found">
    <h1>{{ props.error?.name ?? 'Error' }}</h1>
    <h4>{{ props.error?.message ?? 'Page Not Found' }}</h4>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

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
