<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div aria-label="Date Style" class="btn-group" role="group">
    <input
      id="dsradio1"
      :checked="!this.$store.state.relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="this.$store.commit('setRelativeDates', false)"
    />
    <label class="btn btn-outline-primary" for="dsradio1">Absolute</label>
    <input
      id="dsradio2"
      :checked="this.$store.state.relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="this.$store.commit('setRelativeDates', true)"
    />
    <label class="btn btn-outline-primary" for="dsradio2">Relative</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DateStyleSegmentedControl",
});
</script>
