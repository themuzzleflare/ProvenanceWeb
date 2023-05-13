<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<script setup lang="ts">
import { computed } from 'vue'

import type CategoryResource from '@/upapi/CategoryResource'

const props = defineProps<{
  category: CategoryResource
}>()

const categoryName = computed(() => props.category.attributes.name)
</script>

<template>
  <span id="categoryName">{{ categoryName }}</span>
</template>

<style lang="scss" scoped>
#categoryName:hover {
  cursor: pointer;
}
</style>
