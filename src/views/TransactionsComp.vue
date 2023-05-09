<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

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
import useProvenanceStore from '@/store'

import { useRouter } from 'vue-router'

dayjs.extend(utc)
dayjs.extend(timezone)

type GroupDictionary = Record<string, TransactionResource[]>
type SortingDate = 'sortingDate'

const router = useRouter()
const store = useProvenanceStore()

const transactions = ref(null as unknown as TransactionResource[])
const error = ref(null as unknown as Error)
const searchQuery = ref('')
const settledOnly = ref(false)
const noTransactions = ref(false)

watch(transactions, (newValue: TransactionResource[]) => {
  noTransactions.value = newValue.length === 0
})

watch(error, (newValue: Error) => {
  setPageTitle(newValue.name)
  setPageDescription(newValue.message)
})

const dateGrouping = computed((): boolean => {
  return store.dateGrouping
})

const filteredTransactions = computed((): TransactionResource[] => {
  return transactions.value.filter((transaction: TransactionResource) => {
    return (
      (!settledOnly.value || transaction.attributes.status === 'SETTLED') &&
      transaction.attributes.description.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !==
        -1
    )
  })
})

const groupedTransactions = computed((): GroupedTransactions[] => {
  const modified = filteredTransactions.value.map((transaction: TransactionResource) => {
    transaction.attributes.sortingDate = dayjs(transaction.attributes.createdAt)
      .tz('Australia/Sydney')
      .startOf('day')
      .format('DD/MM/YYYY')
    return transaction
  })

  const grouped: GroupDictionary = groupBy(modified, 'sortingDate')
  return Object.keys(grouped).map((key) => {
    return {
      date: key,
      transactions: grouped[key]
    }
  })
})

onMounted(() => {
  UpFacade.getTransactions()
    .then((response) => {
      console.log(response.data)
      transactions.value = response.data.data
    })
    .catch((error) => {
      console.error(error)
      error.value = error
    })
})

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
    ;(rv[x.attributes[key]] = rv[x.attributes[key]] || []).push(x)
    return rv
  }, {})
}

function setPageTitle(title: string): void {
  store.setPageTitle(title)
}

function setPageDescription(description: string): void {
  store.setPageDescription(description)
}
</script>

<template>
  <PageNotFound v-if="error" :error="error" />
  <NoContent v-else-if="noTransactions" message="No transactions exist" />
  <Spinner v-else-if="!transactions" />
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

<style scoped lang="scss">
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
