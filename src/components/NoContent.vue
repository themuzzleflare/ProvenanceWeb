<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<template>
  <h4 id="noContent">{{ props.message }}</h4>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
}>()
</script>

<style lang="scss" scoped>
#noContent {
  text-align: center;
  margin: 30px;
}
</style>
