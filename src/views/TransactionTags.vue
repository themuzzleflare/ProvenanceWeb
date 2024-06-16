<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProvenanceStore } from '@/store'
import { storeToRefs } from 'pinia'

import PageNotFound from '@/views/PageNotFound.vue'
import TagCell from '@/components/TagCell.vue'
import Spinner from '@/components/SpinnerComp.vue'
import NoContent from '@/components/NoContent.vue'

import type TransactionResource from '@/upapi/TransactionResource'
import type TagResource from '@/upapi/TagResource'
import UpFacade from '@/UpFacade'

const store = useProvenanceStore()
const route = useRoute()
const router = useRouter()

const transaction = ref<TransactionResource | undefined>()
const error = ref<Error | null>(null)
const loading = ref<boolean>(false)
const { apiKey } = storeToRefs(store)

const transactionId = computed(() => route.params.transaction as string)

const transactionDescription = computed(() => transaction.value?.attributes.description)

const tags = computed(() => transaction.value?.relationships.tags.data)

watch(apiKey, () => {
  getTransaction()
})

watch(transaction, (newValue): void => {
  store.setPageTitle('Tags | ' + newValue?.attributes.description)
})

watch(error, (newValue): void => {
  store.setPageTitle(newValue?.name)
  store.setPageDescription(newValue?.message)
})

onMounted(() => {
  getTransaction()
})

function getTransaction(): void {
  loading.value = true

  UpFacade.getTransaction(transactionId.value)
    .then((response) => {
      error.value = null
      transaction.value = response.data.data
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
}

function listTransactionsByTag(tag: TagResource): void {
  router.push({
    name: 'Transactions By Tag',
    params: {
      tag: tag.id
    }
  })
}
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent
    v-else-if="tags?.length === 0"
    :message="`No tags exist for transaction: ${transactionDescription}`"
  />
  <div v-else id="tags">
    <ul class="list-group">
      <TagCell
        v-for="tag in tags"
        :key="tag.id"
        :tag="tag"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByTag(tag)"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#tags {
  margin: 15px;
}
</style>
