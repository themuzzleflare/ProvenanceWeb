<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'

import type AccountResource from '@/upapi/AccountResource'

const props = defineProps<{
  account: AccountResource
}>()

const accountBalance: ComputedRef<string> = computed<string>((): string => {
  return formatBalance(
    props.account.attributes.balance.currencyCode,
    props.account.attributes.balance.value
  )
})

const accountDisplayName: ComputedRef<string> = computed<string>((): string => {
  return props.account.attributes.displayName
})

function formatBalance(currencyCode: string, balance: string): string {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currencyCode
  })
  const newBalance: number = parseFloat(balance)
  return formatter.format(newBalance)
}
</script>

<template>
  <div id="verticalStack">
    <span id="accountBalance">{{ accountBalance }}</span>
    <span id="accountDisplayName">{{ accountDisplayName }}</span>
  </div>
</template>

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
