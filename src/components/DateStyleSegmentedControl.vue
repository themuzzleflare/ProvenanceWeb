<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed } from 'vue'
import { useProvenanceStore } from '@/store'

const store = useProvenanceStore()

const relativeDates = computed(() => store.relativeDates)
</script>

<template>
  <div aria-label="Date Style" class="btn-group" role="group">
    <input
      id="dsradio1"
      :checked="!relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="store.setRelativeDates(false)"
    />
    <label class="btn btn-outline-primary" for="dsradio1">Absolute</label>
    <input
      id="dsradio2"
      :checked="relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="store.setRelativeDates(true)"
    />
    <label class="btn btn-outline-primary" for="dsradio2">Relative</label>
  </div>
</template>
