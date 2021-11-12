<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      id="settledOnly"
      :checked="modelValue"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <label class="form-check-label" for="settledOnly">Settled Only</label>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: ["modelValue"],
  emits: ["update:modelValue"],
})
export default class SettledOnlyCheckbox extends Vue {}
</script>

<style lang="scss" scoped></style>
