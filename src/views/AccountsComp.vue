<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import PageNotFound from '@/views/PageNotFound.vue'
import SearchBar from '@/components/SearchBar.vue'
import AccountCell from '@/components/AccountCell.vue'
import Spinner from '@/components/SpinnerComp.vue'
import NoContent from '@/components/NoContent.vue'

import type AccountResource from '@/upapi/AccountResource'
import UpFacade from '@/UpFacade'
import { useProvenanceStore } from '@/store'
import { storeToRefs } from 'pinia'

const store = useProvenanceStore()
const router = useRouter()

const accounts = ref<AccountResource[]>([])
const error = ref<Error | null>(null)
const searchQuery = ref('')
const loading = ref(false)

const { apiKey } = storeToRefs(store)

watch(apiKey, () => {
  getAccounts()
})

watch(error, (newValue) => {
  store.setPageTitle(newValue?.name)
  store.setPageDescription(newValue?.message)
})

const filteredAccounts = computed((): AccountResource[] => {
  return accounts.value.filter((account: AccountResource) => {
    return (
      account.attributes.displayName.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1
    )
  })
})

const getAccounts = async (): Promise<void> => {
  loading.value = true

  try {
    const response = await UpFacade.getAccounts()
    error.value = null
    accounts.value = response.data.data
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const listTransactionsByAccount = (account: AccountResource): void => {
  router.push({ name: 'Transactions By Account', params: { account: account.id } })
}

onMounted(() => {
  getAccounts()
})
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent v-else-if="accounts.length == 0" message="No accounts exist" />
  <div v-else id="accounts">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AccountCell
        v-for="account in filteredAccounts"
        :key="account.id"
        :account="account"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByAccount(account)"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#accounts {
  margin: 15px;
}
</style>
