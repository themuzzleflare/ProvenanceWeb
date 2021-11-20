<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <PageNotFound v-if="error !== null" :error="error" />
  <NoContent
    v-else-if="noTransactions === true"
    :message="`No transactions exist for category: ${category.attributes.name}`"
  />
  <Spinner v-else-if="transactions === null" />
  <div v-else id="transactionsByCategory">
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
import { Options, Vue } from "vue-class-component";

import PageNotFound from "@/views/PageNotFound.vue";
import TransactionCell from "@/components/TransactionCell.vue";
import Spinner from "@/components/Spinner.vue";
import SearchBar from "@/components/SearchBar.vue";
import NoContent from "@/components/NoContent.vue";

import axios from "axios";

import TransactionResource from "@/UpAPI/TransactionResource";
import CategoryResource from "@/UpAPI/CategoryResource";

@Options({
  components: { PageNotFound, SearchBar, Spinner, TransactionCell, NoContent },
  data() {
    return {
      category: null as unknown as CategoryResource,
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
    category(newValue: CategoryResource): void {
      this.$store.commit("setPageTitle", newValue.attributes.name);
    },
    error(newValue: Error): void {
      this.$store.commit("setPageTitle", newValue.name);
      this.$store.commit("setPageDescription", newValue.message);
    },
  },
  computed: {
    categoryId(): string {
      return this.$route.params.category;
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
    getCategory(): void {
      axios
        .get(`https://api.up.com.au/api/v1/categories/${this.categoryId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.apiKey}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.category = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getTransactions(): void {
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
    this.getCategory();
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
