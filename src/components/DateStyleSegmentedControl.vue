<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<template>
  <div aria-label="Date Style" class="btn-group" role="group">
    <input
      id="dsradio1"
      :checked="!relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="setRelativeDates(false)"
    />
    <label class="btn btn-outline-primary" for="dsradio1">Absolute</label>
    <input
      id="dsradio2"
      :checked="relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="setRelativeDates(true)"
    />
    <label class="btn btn-outline-primary" for="dsradio2">Relative</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProvenanceStore } from '@/store'

const relativeDates = computed(() => useProvenanceStore().relativeDates)

function setRelativeDates(value: boolean) {
  useProvenanceStore().setRelativeDates(value)
}
</script>
