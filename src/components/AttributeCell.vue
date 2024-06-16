<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  leftText: string
  detailText?: string
}>()

const isMonoRight = computed(() => props.leftText === 'Raw Text')
</script>

<template>
  <div id="horizontalStack">
    <span id="leftText">{{ leftText }}</span>
    <span
      id="detailText"
      :class="{
        monoRight: isMonoRight
      }"
      >{{ detailText }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
#horizontalStack {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#leftText {
  font-weight: 500;
}

#detailText {
  text-align: right;
}

.monoRight {
  font-family: 'sf-mono', monospace;
}
</style>
