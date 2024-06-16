<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed } from 'vue'

import type TagResource from '@/upapi/TagResource'

const props = defineProps<{
  tag: TagResource
}>()

const tagName = computed(() => props.tag.id)
</script>

<template>
  <span id="tagName">{{ tagName }}</span>
</template>

<style lang="scss" scoped>
#tagName:hover {
  cursor: pointer;
}
</style>
