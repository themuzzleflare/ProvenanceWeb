<!-- Copyright © 2021-2022 Paul Tavitian -->

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

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapActions, mapStores } from 'pinia'
import { useProvenanceStore } from '@/store'

export default defineComponent({
  name: 'DateStyleSegmentedControl',
  computed: {
    ...mapStores(useProvenanceStore),
    ...mapState(useProvenanceStore, ['relativeDates'])
  },
  methods: {
    ...mapActions(useProvenanceStore, {
      setRelativeDates: 'setRelativeDates'
    })
  }
})
</script>
