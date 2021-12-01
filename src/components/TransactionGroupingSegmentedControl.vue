<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div aria-label="Transaction Grouping" class="btn-group" role="group">
    <input
      id="tgradio1"
      :checked="this.$store.state.dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="this.$store.commit('setDateGrouping', true)"
    />
    <label class="btn btn-outline-primary" for="tgradio1">Dates</label>
    <input
      id="tgradio2"
      :checked="!this.$store.state.dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="this.$store.commit('setDateGrouping', false)"
    />
    <label class="btn btn-outline-primary" for="tgradio2">Transactions</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TransactionGroupingSegmentedControl",
});
</script>
