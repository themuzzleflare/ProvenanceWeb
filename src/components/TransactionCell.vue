<!--
  - Copyright © 2023 Paul Tavitian.
  -->

<script setup lang="ts">
import { computed } from 'vue'
import { useProvenanceStore } from '@/store'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import type TransactionResource from '@/upapi/TransactionResource'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

const props = defineProps<{
  transaction: TransactionResource
}>()

const store = useProvenanceStore()

const description = computed(() => props.transaction.attributes.description)
const creationDate = computed(() => formatDate(props.transaction.attributes.createdAt))
const amount = computed(() =>
  formatAmount(
    props.transaction.attributes.amount.currencyCode,
    props.transaction.attributes.amount.value
  )
)
const isPositiveAmount = computed(() => parseFloat(props.transaction.attributes.amount.value) > 0)

const relativeDates = computed(() => store.relativeDates)

function formatDate(date: string): string {
  return relativeDates.value
    ? dayjs().to(dayjs(date))
    : dayjs(date).tz('Australia/Sydney').format('D MMM, YYYY h:mm A')
}

function formatAmount(currencyCode: string, amount: string): string {
  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currencyCode
  })
  const newAmount = parseFloat(amount)
  return formatter.format(newAmount)
}
</script>

<template>
  <div id="horizontalStack">
    <div id="verticalStack">
      <span id="description">{{ description }}</span>
      <span id="creationDate" class="text-secondary">{{ creationDate }}</span>
    </div>
    <span id="amount" :class="{ positiveAmount: isPositiveAmount }">{{ amount }}</span>
  </div>
</template>

<style scoped lang="scss">
#horizontalStack {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;

  &:hover {
    cursor: pointer;
  }
}

#verticalStack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#description {
  font-weight: 500;
}

#amount {
  text-align: right;
}

.positiveAmount {
  color: #00ba81;
}
</style>
