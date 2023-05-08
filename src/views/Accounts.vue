<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <PageNotFound v-if="error" :error="error" />
  <NoContent v-else-if="noAccounts" message="No accounts exist" />
  <Spinner v-else-if="!accounts" />
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

<script lang="ts">
import { defineComponent } from 'vue'

import PageNotFound from '@/views/PageNotFound.vue'
import SearchBar from '@/components/SearchBar.vue'
import AccountCell from '@/components/AccountCell.vue'
import Spinner from '@/components/Spinner.vue'
import NoContent from '@/components/NoContent.vue'

import type AccountResource from '@/upapi/AccountResource'
import { mapActions } from 'pinia'
import UpFacade from '@/UpFacade'
import { useProvenanceStore } from '@/store'

export default defineComponent({
  name: 'AccountsComp',
  components: { PageNotFound, SearchBar, AccountCell, Spinner, NoContent },
  data() {
    return {
      accounts: null as unknown as AccountResource[],
      error: null as unknown as Error,
      searchQuery: '',
      noAccounts: false
    }
  },
  watch: {
    accounts(newValue: AccountResource[]): void {
      this.noAccounts = newValue.length === 0
    },
    error(newValue: Error): void {
      this.pageTitle(newValue.name)
      this.pageDescription(newValue.message)
    }
  },
  computed: {
    filteredAccounts(): AccountResource[] {
      return this.accounts.filter((account: AccountResource): boolean => {
        return (
          account.attributes.displayName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !==
          -1
        )
      })
    }
  },
  methods: {
    getAccounts(): void {
      UpFacade.getAccounts()
        .then((response) => {
          console.log(response.data)
          this.accounts = response.data.data
        })
        .catch((error) => {
          console.error(error)
          this.error = error
        })
    },
    listTransactionsByAccount(account: AccountResource): void {
      this.$router.push({
        name: 'Transactions By Account',
        params: {
          account: account.id
        }
      })
    },
    ...mapActions(useProvenanceStore, {
      pageTitle: 'setPageTitle',
      pageDescription: 'setPageDescription'
    })
  },
  mounted() {
    this.getAccounts()
  }
})
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

#accounts {
  margin: 15px;
}
</style>
