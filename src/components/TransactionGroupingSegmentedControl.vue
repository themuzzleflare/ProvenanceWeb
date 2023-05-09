<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<template>
  <div aria-label="Transaction Grouping" class="btn-group" role="group">
    <input
      id="tgradio1"
      :checked="dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="setDateGrouping(true)"
    />
    <label class="btn btn-outline-primary" for="tgradio1">Dates</label>
    <input
      id="tgradio2"
      :checked="!dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="setDateGrouping(false)"
    />
    <label class="btn btn-outline-primary" for="tgradio2">Transactions</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProvenanceStore } from '@/store'

const dateGrouping = computed(() => {
  return useProvenanceStore().dateGrouping
})

function setDateGrouping(dateGrouping: boolean): void {
  useProvenanceStore().setDateGrouping(dateGrouping)
}
</script>
