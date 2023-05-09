<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<template>
  <span id="tagName">{{ tagName }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type TagResource from '@/upapi/TagResource'

const props = defineProps<{
  tag: TagResource
}>()

const tagName = computed(() => {
  return props.tag.id
})
</script>

<style lang="scss" scoped>
#tagName:hover {
  cursor: pointer;
}
</style>
