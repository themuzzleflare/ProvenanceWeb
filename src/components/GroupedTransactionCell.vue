<!-- Copyright © 2021 Paul Tavitian -->

<template>
  <transition-group
    class="list-group"
    name="list-complete"
    tag="ul"
    v-for="group in groupedTransactions"
    id="dateGroup"
    :key="group.date"
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
  </transition-group>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PropType } from "vue";

import TransactionCell from "@/components/TransactionCell.vue";

import GroupedTransaction from "@/UpAPI/GroupedTransaction";
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

#dateGroup {
  margin-bottom: 15px;

  #dateHeader {
    position: sticky;
    top: 0;
    z-index: 2;
  }
}
</style>
