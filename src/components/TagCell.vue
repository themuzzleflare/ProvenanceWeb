<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <span id="tagName">{{ tagName }}</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    tag: Object,
  },
  computed: {
    tagName(): string {
      return this.tag.id;
    },
  },
})
export default class TagCell extends Vue {
  tag!: Record<string, unknown>;
}
</script>

<style lang="scss" scoped>
#tagName:hover {
  cursor: pointer;
}
</style>
