<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed } from 'vue'
import { useProvenanceStore } from '@/store'

const store = useProvenanceStore()

const dateGrouping = computed(() => store.dateGrouping)
</script>

<template>
  <div aria-label="Transaction Grouping" class="btn-group" role="group">
    <input
      id="tgradio1"
      :checked="dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="store.setDateGrouping(true)"
    />
    <label class="btn btn-outline-primary" for="tgradio1">Dates</label>
    <input
      id="tgradio2"
      :checked="!dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="store.setDateGrouping(false)"
    />
    <label class="btn btn-outline-primary" for="tgradio2">Transactions</label>
  </div>
</template>
