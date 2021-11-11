<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <span id="tagName">{{ tagName }}</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TagResource from "@/UpAPI/TagResource";
import { PropType } from "vue";

@Options({
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
})
export default class TagCell extends Vue {
  tag!: TagResource;
}
</script>

<style lang="scss" scoped>
#tagName:hover {
  cursor: pointer;
}
</style>
