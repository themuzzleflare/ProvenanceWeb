<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="transactions === null" />
  <div v-else id="transactionsByAccount">
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
import Spinner from "@/components/Spinner.vue";
import SearchBar from "@/components/SearchBar.vue";
import TransactionCell from "@/components/TransactionCell.vue";

import axios from "axios";

import { Options, Vue } from "vue-class-component";
import TransactionResource from "@/UpAPI/TransactionResource";

@Options({
  components: { SearchBar, Spinner, TransactionCell },
  data() {
    return {
      transactions: null as unknown as TransactionResource[],
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    accountId(): string {
      return this.$route.params.account;
    },
    filteredTransactions(): TransactionResource[] {
      return this.transactions.filter(
        (transaction: TransactionResource): boolean => {
          return (
            transaction.attributes.description
              .toLowerCase()
              .indexOf(this.searchQuery.toLowerCase()) !== -1
          );
        }
      );
    },
  },
  methods: {
    getTransactions(): void {
      axios
        .get(
          `https://api.up.com.au/api/v1/accounts/${this.accountId}/transactions`,
          {
            params: {
              "page[size]": "100",
            },
            headers: {
              Authorization: `Bearer ${localStorage.apiKey}`,
            },
          }
        )
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
  },
  mounted() {
    this.getTransactions();
  },
})
export default class TransactionsByAccount extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#transactionsByAccount {
  margin: 15px;
}
</style>
