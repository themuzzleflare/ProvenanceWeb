<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get(): string {
    return props.modelValue
  },
  set(newValue: string): void {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <input
    id="searchBar"
    v-model="value"
    aria-label="Search"
    class="form-control"
    placeholder="Search"
    type="search"
  />
</template>

<style lang="scss" scoped>
#searchBar {
  margin-bottom: 30px;
}
</style>
