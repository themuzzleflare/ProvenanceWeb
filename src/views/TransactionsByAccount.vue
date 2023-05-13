<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useProvenanceStore } from '@/store'

import PageNotFound from '@/views/PageNotFound.vue'
import Spinner from '@/components/SpinnerComp.vue'
import SearchBar from '@/components/SearchBar.vue'
import TransactionCell from '@/components/TransactionCell.vue'
import NoContent from '@/components/NoContent.vue'

import type TransactionResource from '@/upapi/TransactionResource'
import type AccountResource from '@/upapi/AccountResource'
import UpFacade from '@/UpFacade'

const store = useProvenanceStore()
const router = useRouter()
const route = useRoute()

const transactions = ref<TransactionResource[]>([])
const account = ref<AccountResource>()
const error = ref<Error | null>(null)
const searchQuery = ref('')

const loading = ref(false)

const { apiKey } = storeToRefs(store)

watch(apiKey, () => getAccountAndTransactions())

watch(error, (newValue: Error) => {
  store.setPageTitle(newValue.name)
  store.setPageDescription(newValue.message)
})

watch(account, (newValue: AccountResource) => {
  store.setPageTitle(newValue.attributes.displayName)
})

const accountId = computed(() => route.params.account as string)

const accountDisplayName = computed((): string | undefined => {
  return account.value?.attributes.displayName
})

const filteredTransactions = computed((): TransactionResource[] => {
  return transactions.value.filter((transaction: TransactionResource) => {
    return (
      transaction.attributes.description.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !==
      -1
    )
  })
})

const getAccountAndTransactions = async (): Promise<void> => {
  loading.value = true

  try {
    const accountResponse = await UpFacade.getAccount(accountId.value)
    const transactionsResponse = await UpFacade.getTransactionsByAccount(accountId.value)
    error.value = null
    account.value = accountResponse.data.data
    transactions.value = transactionsResponse.data.data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

function viewTransactionDetails(transaction: TransactionResource): void {
  router.push({
    name: 'Transaction Detail',
    params: {
      transaction: transaction.id
    }
  })
}

onMounted(() => getAccountAndTransactions())
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent
    v-else-if="transactions.length === 0"
    :message="`No transactions exist for account: ${accountDisplayName}`"
  />
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

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#transactionsByAccount {
  margin: 15px;
}
</style>
