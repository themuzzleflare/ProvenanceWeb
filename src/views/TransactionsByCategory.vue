<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProvenanceStore } from '@/store'

import PageNotFound from '@/views/PageNotFound.vue'
import TransactionCell from '@/components/TransactionCell.vue'
import Spinner from '@/components/SpinnerComp.vue'
import SearchBar from '@/components/SearchBar.vue'
import NoContent from '@/components/NoContent.vue'

import type TransactionResource from '@/upapi/TransactionResource'
import type CategoryResource from '@/upapi/CategoryResource'
import UpFacade from '@/UpFacade'

const store = useProvenanceStore()
const router = useRouter()
const route = useRoute()

const category = ref<CategoryResource>()
const transactions = ref<TransactionResource[]>([])
const error = ref<Error | null>(null)
const searchQuery = ref('')
const loading = ref(false)
const { apiKey } = storeToRefs(store)

watch(apiKey, () => getCategoryAndTransactions())

watch(error, (newValue: Error) => {
  store.setPageTitle(newValue.name)
  store.setPageDescription(newValue.message)
})

watch(category, (newValue: CategoryResource) => {
  store.setPageTitle(newValue.attributes.name)
})

const categoryId = computed(() => route.params.category as string)

const categoryName = computed((): string | undefined => {
  return category.value?.attributes.name
})

const filteredTransactions = computed((): TransactionResource[] => {
  return transactions.value.filter((transaction: TransactionResource) => {
    return (
      transaction.attributes.description.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !==
      -1
    )
  })
})

const getCategoryAndTransactions = async (): Promise<void> => {
  loading.value = true

  try {
    const categoryResponse = await UpFacade.getCategory(categoryId.value)
    const transactionsResponse = await UpFacade.getTransactionsByCategory(categoryId.value)

    error.value = null
    category.value = categoryResponse.data.data
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

onMounted(() => {
  getCategoryAndTransactions()
})
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent
    v-else-if="transactions.length === 0"
    :message="`No transactions exist for category: ${categoryName}`"
  />
  <div v-else id="transactionsByCategory">
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

#transactionsByCategory {
  margin: 15px;
}
</style>
