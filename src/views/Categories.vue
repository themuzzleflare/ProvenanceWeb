<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="categories === null" />
  <div v-else id="categories">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <CategoryCell
        v-for="category in filteredCategories"
        :key="category.id"
        :category="category"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByCategory(category)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import CategoryCell from "@/components/CategoryCell.vue";
import Spinner from "@/components/Spinner.vue";

import axios from "axios";

import { Options, Vue } from "vue-class-component";
import CategoryResource from "@/UpAPI/CategoryResource";

@Options({
  components: { SearchBar, CategoryCell, Spinner },
  data() {
    return {
      categories: null as unknown as CategoryResource[],
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredCategories(): CategoryResource[] {
      return this.categories.filter((category: CategoryResource): boolean => {
        return (
          category.attributes.name
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    getCategories(): void {
      axios
        .get("https://api.up.com.au/api/v1/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.apiKey}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        });
    },
    listTransactionsByCategory(category: CategoryResource): void {
      this.$router.push({
        name: "Transactions By Category",
        params: {
          category: category.id,
        },
      });
    },
  },
  mounted() {
    this.getCategories();
  },
})
export default class Categories extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#categories {
  margin: 15px;
}
</style>
