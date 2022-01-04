<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <input
    id="searchBar"
    v-model="value"
    aria-label="Search"
    class="form-control"
    placeholder="Search"
    type="search"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  computed: {
    value: {
      get(): string {
        return this.modelValue;
      },
      set(newValue: string): void {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
});
</script>

<style lang="scss" scoped>
#searchBar {
  margin-bottom: 30px;
}
</style>
