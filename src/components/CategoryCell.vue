<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <span id="categoryName">{{ categoryName }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import CategoryResource from "@/UpAPI/CategoryResource";

export default defineComponent({
  name: "CategoryCell",
  props: {
    category: {
      type: Object as PropType<CategoryResource>,
      required: true,
    },
  },
  computed: {
    categoryName(): string {
      return this.category.attributes.name;
    },
  },
});
</script>

<style lang="scss" scoped>
#categoryName:hover {
  cursor: pointer;
}
</style>
