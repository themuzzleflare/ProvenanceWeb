<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div id="horizontalStack">
    <span id="leftText">{{ leftText }}</span>
    <span
      id="detailText"
      :class="{
        monoRight: leftText === 'Raw Text',
      }"
      >{{ detailText }}</span
    >
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    leftText: String,
    detailText: String,
  },
})
export default class AttributeCell extends Vue {
  leftText!: string;
  detailText!: string;
}
</script>

<!--suppress CssUnusedSymbol -->
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
