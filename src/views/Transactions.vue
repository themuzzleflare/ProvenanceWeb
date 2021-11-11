<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <Spinner v-if="transactions === null" />
  <div v-else id="transactions">
    <div id="searchSection">
      <SearchBar v-model="searchQuery" />
      <SegmentedControl />
    </div>
    <GroupedTransactionCell
      v-if="$store.state.dateGrouping"
      :grouped-transactions="groupedTransactions"
    />
    <transition-group v-else class="list-group" name="flip-list" tag="ul">
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
import GroupedTransactionCell from "@/components/GroupedTransactionCell.vue";
import SegmentedControl from "@/components/SegmentedControl.vue";

import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    SegmentedControl,
    GroupedTransactionCell,
    TransactionCell,
    Spinner,
    SearchBar,
  },
  data() {
    return {
      transactions: null,
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter((transaction: any) => {
        return (
          transaction.attributes.description
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1
        );
      });
    },
    groupedTransactions() {
      const modified = this.filteredTransactions.map((transaction: any) => {
        transaction.attributes["sortingDate"] = dayjs(
          transaction.attributes.createdAt
        )
          .tz("Australia/Sydney")
          .startOf("day")
          .format("DD/MM/YYYY");
        return transaction;
      });
      const grouped = this.groupBy(modified, "sortingDate");
      return Object.keys(grouped).map((key) => {
        return {
          date: key,
          transactions: grouped[key],
        };
      });
    },
  },
  methods: {
    getTransactions() {
      axios
        .get("https://api.up.com.au/api/v1/transactions", {
          params: {
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
    groupBy(xs: any, key: string) {
      return xs.reduce(function (rv: any, x: any) {
        (rv[x.attributes[key]] = rv[x.attributes[key]] || []).push(x);
        return rv;
      }, {});
    },
  },
  mounted() {
    this.getTransactions();
  },
})
export default class Transactions extends Vue {}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#searchBar {
  margin-bottom: 10px;
}

#searchSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

#transactions {
  margin: 15px;
}
</style>
