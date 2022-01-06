<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <PageNotFound v-if="error" :error="error" />
  <NoContent
    v-else-if="noTransactions"
    :message="`No transactions exist for tag: ${tagId}`"
  />
  <Spinner v-else-if="!transactions" />
  <div v-else id="transactionsByTag">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <TransactionCell
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        :transaction="transaction"
        class="list-group-item list-group-item-action"
        @click="viewTransactionDetails(transaction)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageNotFound from "@/views/PageNotFound.vue";
import Spinner from "@/components/Spinner.vue";
import SearchBar from "@/components/SearchBar.vue";
import TransactionCell from "@/components/TransactionCell.vue";
import NoContent from "@/components/NoContent.vue";

import TransactionResource from "@/upapi/TransactionResource";
import { mapMutations } from "vuex";
import UpFacade from "@/UpFacade";

export default defineComponent({
  name: "TransactionsByTag",
  components: { NoContent, PageNotFound, SearchBar, Spinner, TransactionCell },
  data() {
    return {
      transactions: null as unknown as TransactionResource[],
      error: null as unknown as Error,
      searchQuery: "",
      noTransactions: false,
    };
  },
  watch: {
    transactions(newValue: TransactionResource[]): void {
      this.noTransactions = newValue.length === 0;
    },
    error(newValue: Error): void {
      this.pageTitle(newValue.name);
      this.pageDescription(newValue.message);
    },
  },
  computed: {
    tagId(): string {
      return this.$route.params.tag as string;
    },
    filteredTransactions(): TransactionResource[] {
      return this.transactions.filter((transaction) => {
        return (
          transaction.attributes.description
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    getTransactions(): void {
      UpFacade.getTransactionsByTag(this.tagId)
        .then((response) => {
          console.log(response.data);
          this.transactions = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        });
    },
    viewTransactionDetails(transaction: TransactionResource): void {
      this.$router.push({
        name: "Transaction Detail",
        params: {
          transaction: transaction.id,
        },
      });
    },
    ...mapMutations({
      pageTitle: "setPageTitle",
      pageDescription: "setPageDescription",
    }),
  },
  mounted() {
    this.$store.commit("setPageTitle", this.tagId);
    this.getTransactions();
  },
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#transactionsByTag {
  margin: 15px;
}
</style>
