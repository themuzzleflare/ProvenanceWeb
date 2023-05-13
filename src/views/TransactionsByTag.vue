<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProvenanceStore } from '@/store'
import { storeToRefs } from 'pinia'

import PageNotFound from '@/views/PageNotFound.vue'
import Spinner from '@/components/SpinnerComp.vue'
import SearchBar from '@/components/SearchBar.vue'
import TransactionCell from '@/components/TransactionCell.vue'
import NoContent from '@/components/NoContent.vue'

import type TransactionResource from '@/upapi/TransactionResource'
import UpFacade from '@/UpFacade'

const store = useProvenanceStore()
const route = useRoute()
const router = useRouter()

const transactions = ref<TransactionResource[]>([])
const error = ref<Error | null>(null)
const searchQuery = ref('')
const loading = ref(false)
const { apiKey } = storeToRefs(store)

watch(apiKey, () => {
  getTransactions()
})

watch(error, (newValue: Error) => {
  store.setPageTitle(newValue.name)
  store.setPageDescription(newValue.message)
})

const tagId = computed(() => route.params.tag as string)

const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction: TransactionResource) => {
    return (
      transaction.attributes.description.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !==
      -1
    )
  })
})

function getTransactions(): void {
  loading.value = true

  UpFacade.getTransactionsByTag(tagId.value)
    .then((response) => {
      error.value = null
      transactions.value = response.data.data
    })
    .catch((err) => {
      err.value = err
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

onMounted(() => {
  store.setPageTitle(tagId.value)
  getTransactions()
})
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent
    v-else-if="transactions.length == 0"
    :message="`No transactions exist for tag: ${tagId}`"
  />
  <div v-else id="transactionsByTag">
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

#transactionsByTag {
  margin: 15px;
}
</style>
