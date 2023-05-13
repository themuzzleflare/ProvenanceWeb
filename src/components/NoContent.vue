<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<script setup lang="ts">
const props = defineProps<{
  message: string
}>()
</script>

<template>
  <h4 id="noContent">{{ props.message }}</h4>
</template>

<style lang="scss" scoped>
#noContent {
  text-align: center;
  margin: 30px;
}
</style>
