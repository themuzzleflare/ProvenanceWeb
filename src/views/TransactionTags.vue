<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <PageNotFound v-if="error" :error="error" />
  <NoContent
    v-else-if="noTags"
    :message="`No tags exist for transaction: ${transactionDescription}`"
  />
  <Spinner v-else-if="!transaction" />
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

<script lang="ts">
import { defineComponent } from 'vue'

import PageNotFound from '@/views/PageNotFound.vue'
import TagCell from '@/components/TagCell.vue'
import Spinner from '@/components/Spinner.vue'
import NoContent from '@/components/NoContent.vue'

import type TransactionResource from '@/upapi/TransactionResource'
import type TagResource from '@/upapi/TagResource'
import { mapActions } from 'pinia'
import UpFacade from '@/UpFacade'
import { useProvenanceStore } from '@/store'

export default defineComponent({
  name: 'TransactionTags',
  components: { NoContent, PageNotFound, TagCell, Spinner },
  data() {
    return {
      transaction: null as unknown as TransactionResource,
      error: null as unknown as Error,
      noTags: false
    }
  },
  watch: {
    transaction(newValue: TransactionResource): void {
      this.noTags = newValue.relationships.tags.data.length === 0
    },
    error(newValue: Error): void {
      this.pageTitle(newValue.name)
      this.pageDescription(newValue.message)
    }
  },
  computed: {
    transactionId(): string {
      return this.$route.params.transaction as string
    },
    transactionDescription(): string {
      return this.transaction.attributes.description
    },
    tags(): TagResource[] {
      return this.transaction.relationships.tags.data
    }
  },
  methods: {
    getTransaction(): void {
      UpFacade.getTransaction(this.transactionId)
        .then((response) => {
          console.log(response.data)
          this.transaction = response.data.data
        })
        .catch((error) => {
          console.error(error)
          this.error = error
        })
    },
    listTransactionsByTag(tag: TagResource): void {
      this.$router.push({
        name: 'Transactions By Tag',
        params: {
          tag: tag.id
        }
      })
    },
    ...mapActions(useProvenanceStore, {
      pageTitle: 'setPageTitle',
      pageDescription: 'setPageDescription'
    })
  },
  mounted() {
    this.getTransaction()
  }
})
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#tags {
  margin: 15px;
}
</style>
