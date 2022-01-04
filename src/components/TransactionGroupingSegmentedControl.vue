<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <div aria-label="Transaction Grouping" class="btn-group" role="group">
    <input
      id="tgradio1"
      :checked="this.dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="this.setDateGrouping(true)"
    />
    <label class="btn btn-outline-primary" for="tgradio1">Dates</label>
    <input
      id="tgradio2"
      :checked="!this.dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="tgradio"
      type="radio"
      @click="this.setDateGrouping(false)"
    />
    <label class="btn btn-outline-primary" for="tgradio2">Transactions</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "TransactionGroupingSegmentedControl",
  computed: mapState(["dateGrouping"]),
  methods: mapMutations(["setDateGrouping"]),
});
</script>
