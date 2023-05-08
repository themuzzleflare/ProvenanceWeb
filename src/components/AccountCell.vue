<!-- Copyright © 2021-2022 Paul Tavitian -->

<template>
  <div id="verticalStack">
    <span id="accountBalance">{{ accountBalance }}</span>
    <span id="accountDisplayName">{{ accountDisplayName }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import type AccountResource from '@/upapi/AccountResource'

export default defineComponent({
  name: 'AccountCell',
  props: {
    account: {
      type: Object as PropType<AccountResource>,
      required: true
    }
  },
  computed: {
    accountBalance(): string {
      return this.formatBalance(
        this.account.attributes.balance.currencyCode,
        this.account.attributes.balance.value
      )
    },
    accountDisplayName(): string {
      return this.account.attributes.displayName
    }
  },
  methods: {
    formatBalance(currencyCode: string, balance: string): string {
      const formatter = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: currencyCode
      })
      const newBalance = parseFloat(balance)
      return formatter.format(newBalance)
    }
  }
})
</script>

<style lang="scss" scoped>
#verticalStack {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
}

#accountBalance {
  font-weight: bold;
  color: #ff7967;
  font-size: larger;
}

#accountDisplayName {
  word-wrap: break-word;
}
</style>
