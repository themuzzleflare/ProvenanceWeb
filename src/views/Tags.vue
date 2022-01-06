<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <PageNotFound v-if="error" :error="error" />
  <NoContent v-else-if="noTags" message="No tags exist" />
  <Spinner v-else-if="!tags" />
  <div v-else id="tags">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <TagCell
        v-for="tag in filteredTags"
        :key="tag.id"
        :tag="tag"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByTag(tag)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageNotFound from "@/views/PageNotFound.vue";
import SearchBar from "@/components/SearchBar.vue";
import TagCell from "@/components/TagCell.vue";
import Spinner from "@/components/Spinner.vue";
import NoContent from "@/components/NoContent.vue";

import TagResource from "@/upapi/TagResource";
import { mapMutations } from "vuex";
import UpFacade from "@/UpFacade";

export default defineComponent({
  name: "Tags",
  components: { PageNotFound, SearchBar, TagCell, Spinner, NoContent },
  data() {
    return {
      tags: null as unknown as TagResource[],
      error: null as unknown as Error,
      searchQuery: "",
      noTags: false,
    };
  },
  watch: {
    tags(newValue: TagResource[]): void {
      this.noTags = newValue.length === 0;
    },
    error(newValue: Error): void {
      this.pageTitle(newValue.name);
      this.pageDescription(newValue.message);
    },
  },
  computed: {
    filteredTags(): TagResource[] {
      return this.tags.filter((tag) => {
        return (
          tag.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    getTags(): void {
      UpFacade.getTags()
        .then((response) => {
          console.log(response.data);
          this.tags = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        });
    },
    listTransactionsByTag(tag: TagResource): void {
      this.$router.push({
        name: "Transactions By Tag",
        params: {
          tag: tag.id,
        },
      });
    },
    ...mapMutations({
      pageTitle: "setPageTitle",
      pageDescription: "setPageDescription",
    }),
  },
  mounted() {
    this.getTags();
  },
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#tags {
  margin: 15px;
}
</style>
