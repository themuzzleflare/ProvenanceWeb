<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <h4 id="noContent">{{ message }}</h4>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoContent",
  props: {
    message: String,
  },
});
</script>

<style lang="scss" scoped>
#noContent {
  text-align: center;
  margin: 30px;
}
</style>
