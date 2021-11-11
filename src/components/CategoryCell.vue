<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <span id="categoryName">{{ categoryName }}</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CategoryResource from "@/UpAPI/CategoryResource";
import { PropType } from "vue";

@Options({
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
})
export default class CategoryCell extends Vue {
  category!: CategoryResource;
}
</script>

<style lang="scss" scoped>
#categoryName:hover {
  cursor: pointer;
}
</style>
