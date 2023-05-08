<!-- Copyright © 2021-2022 Paul Tavitian -->

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

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores, mapActions, mapState } from 'pinia'
import { useProvenanceStore } from '@/store'

export default defineComponent({
  name: 'TransactionGroupingSegmentedControl',
  computed: {
    ...mapStores(useProvenanceStore),
    ...mapState(useProvenanceStore, ['dateGrouping'])
  },
  methods: {
    ...mapActions(useProvenanceStore, {
      setDateGrouping: 'setDateGrouping'
    })
  }
})
</script>
