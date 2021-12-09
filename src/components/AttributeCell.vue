<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div id="horizontalStack">
    <span id="leftText">{{ leftText }}</span>
    <span
      id="detailText"
      :class="{
        monoRight: isMonoRight,
      }"
      >{{ detailText }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AttributeCell",
  props: {
    leftText: {
      type: String,
      required: true,
    },
    detailText: {
      type: String,
      required: false,
    },
  },
  computed: {
    isMonoRight(): boolean {
      return this.leftText === "Raw Text";
    },
  },
});
</script>

<style lang="scss" scoped>
#horizontalStack {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#leftText {
  font-weight: 500;
}

#detailText {
  text-align: right;
}

.monoRight {
  font-family: "sf-mono", monospace;
}
</style>
