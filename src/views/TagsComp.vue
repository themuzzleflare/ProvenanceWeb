<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProvenanceStore } from '@/store'

import PageNotFound from '@/views/PageNotFound.vue'
import SearchBar from '@/components/SearchBar.vue'
import TagCell from '@/components/TagCell.vue'
import Spinner from '@/components/SpinnerComp.vue'
import NoContent from '@/components/NoContent.vue'

import type TagResource from '@/upapi/TagResource'
import UpFacade from '@/UpFacade'
import { storeToRefs } from 'pinia'

const store = useProvenanceStore()
const router = useRouter()

const tags = ref<TagResource[]>([])
const error = ref<Error | null>(null)
const searchQuery = ref('')

const loading = ref(false)

const { apiKey } = storeToRefs(store)

watch(apiKey, () => getTags())

watch(error, (newValue) => {
  store.setPageTitle(newValue?.name)
  store.setPageDescription(newValue?.message)
})

const filteredTags = computed<TagResource[]>(() => {
  return tags.value.filter((tag: TagResource) => {
    return tag.id.toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1
  })
})

function getTags(): void {
  loading.value = true

  UpFacade.getTags()
    .then((response) => {
      error.value = null
      tags.value = response.data.data
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

onMounted(() => {
  getTags()
})
</script>

<template>
  <Spinner v-if="loading" />
  <PageNotFound v-else-if="error" :error="error" />
  <NoContent v-else-if="tags.length == 0" message="No tags exist" />
  <div v-else id="tags">
    <SearchBar v-model="searchQuery" />
    <transition-group class="list-group" name="flip-list" tag="ul">
      <TagCell
        v-for="tag in filteredTags"
        :key="tag.id"
        :tag="tag"
        class="list-group-item list-group-item-action"
        @click="listTransactionsByTag(tag)"
      />
    </transition-group>
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
