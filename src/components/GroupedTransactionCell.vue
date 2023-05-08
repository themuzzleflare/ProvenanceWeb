<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <transition-group
    v-for="group in groupedTransactions"
    id="dateGroup"
    :key="group.date"
    class="list-group"
    name="list-complete"
    tag="ul"
  >
    <div id="dateHeader" :key="group.date" class="list-group-item list-group-item-secondary">
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
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import TransactionCell from '@/components/TransactionCell.vue'

import type GroupedTransactions from '@/upapi/GroupedTransactions'
import type TransactionResource from '@/upapi/TransactionResource'

export default defineComponent({
  name: 'GroupedTransactionCell',
  components: { TransactionCell },
  props: {
    groupedTransactions: {
      type: Array as PropType<GroupedTransactions[]>,
      required: true
    }
  },
  methods: {
    viewTransactionDetails(transaction: TransactionResource): void {
      this.$router.push({
        name: 'Transaction Detail',
        params: {
          transaction: transaction.id
        }
      })
    }
  }
})
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
