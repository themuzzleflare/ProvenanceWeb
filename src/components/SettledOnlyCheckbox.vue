<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get(): boolean {
    return props.modelValue
  },
  set(newValue: boolean): void {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <div class="form-check">
    <input id="settledOnly" v-model="value" class="form-check-input" type="checkbox" />
    <label class="form-check-label" for="settledOnly">Settled Only</label>
  </div>
</template>
