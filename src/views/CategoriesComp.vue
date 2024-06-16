<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed, onMounted, ref, type Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProvenanceStore } from '@/store'

import PageNotFound from '@/views/PageNotFound.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoryCell from '@/components/CategoryCell.vue'
import Spinner from '@/components/SpinnerComp.vue'
import NoContent from '@/components/NoContent.vue'

import type CategoryResource from '@/upapi/CategoryResource'
import UpFacade from '@/UpFacade'
import { storeToRefs } from 'pinia'

const store = useProvenanceStore()
const router = useRouter()

const categories = ref<CategoryResource[]>([])
const error: Ref<Error | null> = ref<Error | null>(null)
const searchQuery: Ref<string> = ref<string>('')

const loading = ref<boolean>(false)

const { apiKey } = storeToRefs(store)

watch(apiKey, () => getCategories())

watch(error, (newValue) => {
  store.setPageTitle(newValue?.name)
  store.setPageDescription(newValue?.message)
})

const filteredCategories = computed<CategoryResource[]>(() => {
  return categories.value.filter((category: CategoryResource) => {
    return category.attributes.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1
  })
})

function getCategories(): void {
  loading.value = true

  UpFacade.getCategories()
    .then((response) => {
      error.value = null
      categories.value = response.data.data
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
}

function listTransactionsByCategory(category: CategoryResource): void {
  router.push({
    name: 'Transactions By Category',
    params: {
      category: category.id
    }
  })
}

onMounted(() => {
  getCategories()
})
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent v-else-if="categories.length == 0" message="No categories exist" />
  <div v-else id="categories">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <CategoryCell
        v-for="category in filteredCategories"
        :key="category.id"
        :category="category"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByCategory(category)"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#categories {
  margin: 15px;
}
</style>
