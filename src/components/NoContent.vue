<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <h4 id="noContent">{{ message }}</h4>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoContent",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
#noContent {
  text-align: center;
  margin: 30px;
}
</style>
