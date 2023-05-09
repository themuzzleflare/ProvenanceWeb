<!--
  - Copyright © 2021-2023 Paul Tavitian.
  -->

<template>
  <div id="verticalStack">
    <span id="accountBalance">{{ accountBalance }}</span>
    <span id="accountDisplayName">{{ accountDisplayName }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type AccountResource from '@/upapi/AccountResource'

const props = defineProps<{
  account: AccountResource
}>()

const accountBalance = computed(() => {
  return formatBalance(
    props.account.attributes.balance.currencyCode,
    props.account.attributes.balance.value
  )
})

const accountDisplayName = computed(() => {
  return props.account.attributes.displayName
})

function formatBalance(currencyCode: string, balance: string): string {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currencyCode
  })
  const newBalance = parseFloat(balance)
  return formatter.format(newBalance)
}
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
