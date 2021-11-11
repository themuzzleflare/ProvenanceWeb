<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="accounts === null" />
  <div v-else id="accounts">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AccountCell
        v-for="account in filteredAccounts"
        :key="account.id"
        :account="account"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByAccount(account.id)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import AccountCell from "@/components/AccountCell.vue";
import Spinner from "@/components/Spinner.vue";

import axios from "axios";

import { Options, Vue } from "vue-class-component";

@Options({
  components: { SearchBar, AccountCell, Spinner },
  data() {
    return {
      accounts: null,
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredAccounts() {
      return this.accounts.filter((account: any) => {
        return (
          account.attributes.displayName
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      });
    },
  },
  methods: {
    getAccounts() {
      axios
        .get("https://api.up.com.au/api/v1/accounts", {
          params: {
            "page[size]": "100",
          },
          headers: {
            Authorization: `Bearer ${localStorage.apiKey}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.accounts = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          this.error = error;
        });
    },
    listTransactionsByAccount(account: string) {
      this.$router.push({
        name: "Transactions By Account",
        params: {
          account: account,
        },
      });
    },
  },
  mounted() {
    this.getAccounts();
  },
})
export default class Accounts extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#accounts {
  margin: 15px;
}
</style>
