<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <span id="tagName">{{ tagName }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TagResource from "@/upapi/TagResource";

export default defineComponent({
  name: "TagCell",
  props: {
    tag: {
      type: Object as PropType<TagResource>,
      required: true,
    },
  },
  computed: {
    tagName(): string {
      return this.tag.id;
    },
  },
});
</script>

<style lang="scss" scoped>
#tagName:hover {
  cursor: pointer;
}
</style>
