<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed, type ComputedRef, onMounted, ref, watch } from 'vue'
import useProvenanceStore from '@/store'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import PageNotFound from '@/views/PageNotFound.vue'
import TransactionGroupingSegmentedControl from '@/components/TransactionGroupingSegmentedControl.vue'
import TransactionCell from '@/components/TransactionCell.vue'
import NoContent from '@/components/NoContent.vue'
import Spinner from '@/components/SpinnerComp.vue'
import GroupedTransactionCell from '@/components/GroupedTransactionCell.vue'
import SearchBar from '@/components/SearchBar.vue'
import SettledOnlyCheckbox from '@/components/SettledOnlyCheckbox.vue'
import DateStyleSegmentedControl from '@/components/DateStyleSegmentedControl.vue'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import type GroupedTransactions from '@/upapi/GroupedTransactions'
import type TransactionResource from '@/upapi/TransactionResource'
import UpFacade from '@/UpFacade'

dayjs.extend(utc)
dayjs.extend(timezone)

type GroupDictionary = Record<string, TransactionResource[]>
type SortingDate = 'sortingDate'

const router = useRouter()
const store = useProvenanceStore()

const transactions = ref<TransactionResource[]>([])
const error = ref<Error | null>(null)
const searchQuery = ref<string>('')
const settledOnly = ref<boolean>(false)

const loading = ref<boolean>(false)

const { apiKey } = storeToRefs(store)

watch(apiKey, (): void => {
  getTransactions()
})

watch(error, (newValue: Error | null): void => {
  store.setPageTitle(newValue?.name)
  store.setPageDescription(newValue?.message)
})

const dateGrouping: ComputedRef<boolean> = computed<boolean>((): boolean => store.dateGrouping)

const filteredTransactions: ComputedRef<TransactionResource[]> = computed(
  (): TransactionResource[] => {
    return transactions.value.filter((transaction: TransactionResource): boolean => {
      return (
        (!settledOnly.value || transaction.attributes.status === 'SETTLED') &&
        transaction.attributes.description
          .toLowerCase()
          .indexOf(searchQuery.value.toLowerCase()) !== -1
      )
    })
  }
)

const groupedTransactions: ComputedRef<GroupedTransactions[]> = computed(
  (): GroupedTransactions[] => {
    const modified: TransactionResource[] = filteredTransactions.value.map(
      (transaction: TransactionResource) => {
        transaction.attributes.sortingDate = dayjs(transaction.attributes.createdAt)
          .tz('Australia/Sydney')
          .startOf('day')
          .format('DD/MM/YYYY')
        return transaction
      }
    )

    const grouped: GroupDictionary = groupBy(modified, 'sortingDate')
    return Object.keys(grouped).map((key: string) => {
      return {
        date: key,
        transactions: grouped[key]
      }
    })
  }
)

function getTransactions(): void {
  loading.value = true

  UpFacade.getTransactions()
    .then((response) => {
      error.value = null
      transactions.value = response.data.data
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
}

function viewTransactionDetails(transaction: TransactionResource): void {
  router.push({
    name: 'Transaction Detail',
    params: {
      transaction: transaction.id
    }
  })
}

function groupBy(xs: TransactionResource[], key: SortingDate): GroupDictionary {
  return xs.reduce<GroupDictionary>((rv, x) => {
    ;(rv[x.attributes[key]!] = rv[x.attributes[key]!] || []).push(x)
    return rv
  }, {})
}

onMounted(() => getTransactions())
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent v-else-if="transactions.length == 0" message="No transactions exist" />
  <div v-else id="transactions">
    <div id="searchSection">
      <SearchBar v-model="searchQuery" />
      <div id="filterSection">
        <TransactionGroupingSegmentedControl />
        <DateStyleSegmentedControl />
        <SettledOnlyCheckbox v-model="settledOnly" />
      </div>
    </div>
    <GroupedTransactionCell v-if="dateGrouping" :grouped-transactions="groupedTransactions" />
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
