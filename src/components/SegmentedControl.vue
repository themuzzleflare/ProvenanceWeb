<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div aria-label="Transaction Grouping" class="btn-group" role="group">
    <input
      id="btnradio1"
      :checked="$store.state.dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="btnradio"
      type="radio"
      @click="$store.commit('transactionGrouping', true)"
    />
    <label class="btn btn-outline-primary" for="btnradio1">Dates</label>
    <input
      id="btnradio2"
      :checked="!$store.state.dateGrouping"
      autocomplete="off"
      class="btn-check"
      name="btnradio"
      type="radio"
      @click="$store.commit('transactionGrouping', false)"
    />
    <label class="btn btn-outline-primary" for="btnradio2">Transactions</label>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class SegmentedControl extends Vue {}
</script>
