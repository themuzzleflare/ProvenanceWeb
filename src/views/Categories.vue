<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <PageNotFound v-if="error" :error="error" />
  <NoContent v-else-if="noCategories" message="No categories exist" />
  <Spinner v-else-if="!categories" />
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
import { Options, Vue } from "vue-class-component";

import PageNotFound from "@/views/PageNotFound.vue";
import SearchBar from "@/components/SearchBar.vue";
import CategoryCell from "@/components/CategoryCell.vue";
import Spinner from "@/components/Spinner.vue";
import NoContent from "@/components/NoContent.vue";

import axios from "axios";

import CategoryResource from "@/UpAPI/CategoryResource";

@Options({
  components: { PageNotFound, SearchBar, CategoryCell, Spinner, NoContent },
  data() {
    return {
      categories: null as unknown as CategoryResource[],
      error: null as unknown as Error,
      searchQuery: "",
      noCategories: false,
    };
  },
  watch: {
    categories(newValue: CategoryResource[]): void {
      this.noCategories = newValue.length === 0;
    },
    error(newValue: Error): void {
      this.$store.commit("setPageTitle", newValue.name);
      this.$store.commit("setPageDescription", newValue.message);
    },
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
