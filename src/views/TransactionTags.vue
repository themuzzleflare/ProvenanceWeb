<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="transaction === null" />
  <div v-else id="tags">
    <ul class="list-group">
      <TagCell
        v-for="tag in tags"
        :key="tag.id"
        :tag="tag"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByTag(tag.id)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import TagCell from "@/components/TagCell.vue";
import Spinner from "@/components/Spinner.vue";

import axios from "axios";

import { Options, Vue } from "vue-class-component";
import TransactionResource from "@/UpAPI/TransactionResource";

@Options({
  components: { TagCell, Spinner },
  data() {
    return {
      transaction: null as unknown as TransactionResource,
      error: null,
    };
  },
  computed: {
    transactionId(): string {
      return this.$route.params.transaction;
    },
    tags() {
      return this.transaction?.relationships.tags.data;
    },
  },
  methods: {
    getTransaction(): void {
      axios
        .get(
          `https://api.up.com.au/api/v1/transactions/${this.transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.apiKey}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.transaction = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        });
    },
    listTransactionsByTag(tag: string): void {
      this.$router.push({
        name: "Transactions By Tag",
        params: {
          tag: tag,
        },
      });
    },
  },
  mounted() {
    this.getTransaction();
  },
})
export default class TransactionTags extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#tags {
  margin: 15px;
}
</style>
