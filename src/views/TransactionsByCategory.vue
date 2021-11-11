<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="transactions === null" />
  <div v-else id="transactionsByCategory">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <TransactionCell
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        :transaction="transaction"
        class="list-group-item list-group-item-action"
        @click="viewTransactionDetails(transaction.id)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import TransactionCell from "@/components/TransactionCell.vue";
import Spinner from "@/components/Spinner.vue";
import SearchBar from "@/components/SearchBar.vue";

import axios from "axios";

import { Options, Vue } from "vue-class-component";

@Options({
  components: { SearchBar, Spinner, TransactionCell },
  data() {
    return {
      transactions: null,
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    categoryId() {
      return this.$route.params.category;
    },
    filteredTransactions() {
      return this.transactions.filter((transaction: any) => {
        return (
          transaction.attributes.description
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    getTransactions() {
      axios
        .get("https://api.up.com.au/api/v1/transactions", {
          params: {
            "filter[category]": this.categoryId,
            "page[size]": "100",
          },
          headers: {
            Authorization: `Bearer ${localStorage.apiKey}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.transactions = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        });
    },
    viewTransactionDetails(transaction: string) {
      this.$router.push({
        name: "Transaction Detail",
        params: {
          transaction: transaction,
        },
      });
    },
  },
  mounted() {
    this.getTransactions();
  },
})
export default class TransactionsByCategory extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#transactionsByCategory {
  margin: 15px;
}
</style>
