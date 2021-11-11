<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <span id="categoryName">{{ categoryName }}</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    category: Object,
  },
  computed: {
    categoryName(): string {
      return this.category.attributes.name;
    },
  },
})
export default class CategoryCell extends Vue {
  category!: Record<string, unknown>;
}
</script>

<style lang="scss" scoped>
#categoryName:hover {
  cursor: pointer;
}
</style>
