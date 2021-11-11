<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <div
    v-for="group in groupedTransactions"
    id="dateGroup"
    :key="group.date"
    class="list-group"
  >
    <div id="dateHeader" class="list-group-item list-group-item-secondary">
      <h4>{{ group.date }}</h4>
    </div>
    <TransactionCell
      v-for="transaction in group.transactions"
      :key="transaction.id"
      :transaction="transaction"
      class="list-group-item list-group-item-action"
      @click="viewTransactionDetails(transaction)"
    />
  </div>
</template>

<script lang="ts">
import TransactionCell from "@/components/TransactionCell.vue";
import { Options, Vue } from "vue-class-component";
import GroupedTransaction from "@/GroupedTransaction";
import { PropType } from "vue";
import TransactionResource from "@/UpAPI/TransactionResource";

@Options({
  components: { TransactionCell },
  props: {
    groupedTransactions: {
      type: Array as PropType<GroupedTransaction[]>,
      required: true,
    },
  },
  methods: {
    viewTransactionDetails(transaction: TransactionResource): void {
      this.$router.push({
        name: "Transaction Detail",
        params: {
          transaction: transaction.id,
        },
      });
    },
  },
})
export default class GroupedTransactionCell extends Vue {
  groupedTransactions!: GroupedTransaction[];
}
</script>

<style lang="scss" scoped>
#dateGroup {
  margin-bottom: 15px;

  #dateHeader {
    position: sticky;
    top: 0;
    z-index: 2;
  }
}
</style>
