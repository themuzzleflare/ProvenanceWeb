<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <PageNotFound v-if="error" :error="error" />
  <NoContent
    v-else-if="noTransactions"
    :message="`No transactions exist for account: ${accountDisplayName}`"
  />
  <Spinner v-else-if="!transactions" />
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
import { defineComponent } from "vue";

import PageNotFound from "@/views/PageNotFound.vue";
import Spinner from "@/components/Spinner.vue";
import SearchBar from "@/components/SearchBar.vue";
import TransactionCell from "@/components/TransactionCell.vue";
import NoContent from "@/components/NoContent.vue";

import TransactionResource from "@/UpAPI/TransactionResource";
import AccountResource from "@/UpAPI/AccountResource";
import { mapActions, mapMutations } from "vuex";

export default defineComponent({
  name: "TransactionsByAccount",
  components: { PageNotFound, SearchBar, Spinner, TransactionCell, NoContent },
  data() {
    return {
      account: null as unknown as AccountResource,
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
    account(newValue: AccountResource): void {
      this.pageTitle(newValue.attributes.displayName);
    },
    error(newValue: Error): void {
      this.pageTitle(newValue.name);
      this.pageDescription(newValue.message);
    },
  },
  computed: {
    accountId(): string {
      return this.$route.params.account as string;
    },
    accountDisplayName(): string {
      return this.account.attributes.displayName;
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
    getAccount(): void {
      this.fetchAccount(this.accountId)
        .then((response) => {
          console.log(response.data);
          this.account = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getTransactions(): void {
      this.fetchTransactions(this.accountId)
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
    ...mapActions({
      fetchTransactions: "getTransactionsByAccount",
      fetchAccount: "getAccount",
    }),
  },
  mounted() {
    this.getAccount();
    this.getTransactions();
  },
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#transactionsByAccount {
  margin: 15px;
}
</style>
