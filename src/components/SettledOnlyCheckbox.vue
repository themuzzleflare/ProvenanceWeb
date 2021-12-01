<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div class="form-check">
    <input
      id="settledOnly"
      :value="modelValue"
      class="form-check-input"
      type="checkbox"
      @input="$emit('update:modelValue', $event.target.checked)"
    />
    <label class="form-check-label" for="settledOnly">Settled Only</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SettledOnlyCheckbox",
  props: ["modelValue"],
  emits: ["update:modelValue"],
});
</script>
