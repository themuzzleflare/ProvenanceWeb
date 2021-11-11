<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <input
    id="searchBar"
    :value="modelValue"
    aria-label="Search"
    class="form-control"
    placeholder="Search"
    type="search"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["modelValue"],
  emits: ["update:modelValue"],
})
export default class SearchBar extends Vue {}
</script>

<style lang="scss" scoped>
#searchBar {
  margin-bottom: 30px;
}
</style>
