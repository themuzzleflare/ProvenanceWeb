<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="tags === null" />
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
import SearchBar from "@/components/SearchBar.vue";
import TagCell from "@/components/TagCell.vue";
import Spinner from "@/components/Spinner.vue";

import axios from "axios";

import { Options, Vue } from "vue-class-component";
import TagResource from "@/UpAPI/TagResource";

@Options({
  components: { SearchBar, TagCell, Spinner },
  data() {
    return {
      tags: null as unknown as TagResource[],
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredTags(): TagResource[] {
      return this.tags.filter((tag: TagResource): boolean => {
        return (
          tag.id.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    getTags(): void {
      axios
        .get("https://api.up.com.au/api/v1/tags", {
          params: {
            "page[size]": "100",
          },
          headers: {
            Authorization: `Bearer ${localStorage.apiKey}`,
          },
        })
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
  },
  mounted() {
    this.getTags();
  },
})
export default class Tags extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#tags {
  margin: 15px;
}
</style>
