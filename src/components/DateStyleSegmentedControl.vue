<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div aria-label="Date Style" class="btn-group" role="group">
    <input
      id="dsradio1"
      :checked="!this.relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="this.setRelativeDates(false)"
    />
    <label class="btn btn-outline-primary" for="dsradio1">Absolute</label>
    <input
      id="dsradio2"
      :checked="this.relativeDates"
      autocomplete="off"
      class="btn-check"
      name="dsradio"
      type="radio"
      @click="this.setRelativeDates(true)"
    />
    <label class="btn btn-outline-primary" for="dsradio2">Relative</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "DateStyleSegmentedControl",
  computed: mapState(["relativeDates"]),
  methods: mapMutations(["setRelativeDates"]),
});
</script>
