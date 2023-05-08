<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <div class="form-check">
    <input id="settledOnly" v-model="value" class="form-check-input" type="checkbox" />
    <label class="form-check-label" for="settledOnly">Settled Only</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SettledOnlyCheckbox',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get(): boolean {
        return this.modelValue
      },
      set(newValue: boolean): void {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
})
</script>
