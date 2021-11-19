<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <PageNotFound v-if="error !== null" :error="error" />
  <Spinner v-else-if="transactions === null" />
  <div v-else id="transactions">
    <div id="searchSection">
      <SearchBar v-model="searchQuery" />
      <div id="filterSection">
        <TransactionGroupingSegmentedControl />
        <DateStyleSegmentedControl />
        <SettledOnlyCheckbox v-model="settledOnly" />
      </div>
    </div>
    <GroupedTransactionCell
      v-if="this.$store.state.dateGrouping"
      :grouped-transactions="groupedTransactions"
    />
    <transition-group v-else class="list-group" name="list-complete" tag="ul">
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
import { reactive } from "vue";

import PageNotFound from "@/views/PageNotFound.vue";
import TransactionCell from "@/components/TransactionCell.vue";
import Spinner from "@/components/Spinner.vue";
import SearchBar from "@/components/SearchBar.vue";
import GroupedTransactionCell from "@/components/GroupedTransactionCell.vue";
import TransactionGroupingSegmentedControl from "@/components/TransactionGroupingSegmentedControl.vue";
import DateStyleSegmentedControl from "@/components/DateStyleSegmentedControl.vue";
import SettledOnlyCheckbox from "@/components/SettledOnlyCheckbox.vue";

import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

import GroupedTransaction from "@/UpAPI/GroupedTransaction";
import TransactionResource from "@/UpAPI/TransactionResource";

type GroupDictionary = Record<string, TransactionResource[]>;
type SortingDate = "sortingDate";

@Options({
  components: {
    PageNotFound,
    SettledOnlyCheckbox,
    DateStyleSegmentedControl,
    TransactionGroupingSegmentedControl,
    GroupedTransactionCell,
    TransactionCell,
    Spinner,
    SearchBar,
  },
  data() {
    return {
      transactions: null as unknown as TransactionResource[],
      error: null as unknown as Error,
      searchQuery: "",
      settledOnly: false,
    };
  },
  watch: {
    error(newValue: Error): void {
      this.$store.commit("setPageTitle", newValue.name);
      this.$store.commit("setPageDescription", newValue.message);
    },
  },
  computed: {
    filteredTransactions(): TransactionResource[] {
      return this.transactions.filter(
        (transaction: TransactionResource): boolean => {
          return (
            (!this.settledOnly ||
              transaction.attributes.status === "SETTLED") &&
            transaction.attributes.description
              .toLowerCase()
              .indexOf(this.searchQuery.toLowerCase()) !== -1
          );
        }
      );
    },
    groupedTransactions(): GroupedTransaction[] {
      const modified: TransactionResource[] = this.filteredTransactions.map(
        (transaction: TransactionResource): TransactionResource => {
          transaction.attributes["sortingDate"] = dayjs(
            transaction.attributes.createdAt
          )
            .tz("Australia/Sydney")
            .startOf("day")
            .format("DD/MM/YYYY");
          return transaction;
        }
      );
      const grouped: GroupDictionary = this.groupBy(modified, "sortingDate");
      return Object.keys(grouped).map((key: string): GroupedTransaction => {
        return reactive<GroupedTransaction>({
          date: key,
          transactions: grouped[key],
        });
      });
    },
  },
  methods: {
    getTransactions(): void {
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
    viewTransactionDetails(transaction: TransactionResource): void {
      this.$router.push({
        name: "Transaction Detail",
        params: {
          transaction: transaction.id,
        },
      });
    },
    groupBy(xs: TransactionResource[], key: SortingDate): GroupDictionary {
      return xs.reduce(
        (rv: GroupDictionary, x: TransactionResource): GroupDictionary => {
          (rv[x.attributes[key]] = rv[x.attributes[key]] || []).push(x);
          return rv;
        },
        {}
      );
    },
  },
  mounted() {
    this.getTransactions();
  },
})
export default class Transactions extends Vue {}
</script>

<style lang="scss" scoped>
.list-group-item {
  transition: all 200ms ease;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
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

#filterSection {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 991px) {
    flex-direction: column;
  }
}

#transactions {
  margin: 15px;
}
</style>
