<!--
  - Copyright © 2021-2024 Paul Tavitian.
  -->

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useProvenanceStore } from '@/store'
import { type RouteLocationNormalizedLoaded, type Router, useRoute, useRouter } from 'vue-router'

import PageNotFound from '@/views/PageNotFound.vue'
import Spinner from '@/components/SpinnerComp.vue'
import AttributeCell from '@/components/AttributeCell.vue'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import type TransactionResource from '@/upapi/TransactionResource'
import type MoneyObject from '@/upapi/MoneyObject'
import type AccountResource from '@/upapi/AccountResource'
import type CategoryResource from '@/upapi/CategoryResource'
import UpFacade from '@/UpFacade'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

const route: RouteLocationNormalizedLoaded = useRoute()
const router: Router = useRouter()
const store = useProvenanceStore()

const transaction = ref<TransactionResource>()
const error = ref<Error>()
const account = ref<AccountResource>()
const transferAccount = ref<AccountResource>()
const category = ref<CategoryResource>()
const parentCategory = ref<CategoryResource>()

const transactionId = computed((): string => {
  return route.params.transaction as string
})

const accountId = computed((): string => {
  return transaction.value!.relationships.account.data.id
})

const transferAccountId = computed((): string | undefined => {
  return transaction.value?.relationships.transferAccount.data?.id
})

const categoryId = computed((): string | undefined => {
  return transaction.value?.relationships.category.data?.id
})

const parentCategoryId = computed((): string | undefined => {
  return transaction.value?.relationships.parentCategory.data?.id
})

const transactionStatus = computed((): string => {
  return transaction.value!.attributes.status.replace('SETTLED', 'Settled').replace('HELD', 'Held')
})

const holdInfo = computed(() => {
  return transaction.value?.attributes.holdInfo
})

const foreignAmount = computed(() => {
  return transaction.value?.attributes.foreignAmount
})

const cardPurchaseMethod = computed(() => {
  return transaction.value?.attributes.cardPurchaseMethod
})

const transactionAmount = computed((): MoneyObject => {
  return transaction.value!.attributes.amount
})

const transactionHoldValue = computed((): string | null => {
  if (holdInfo.value && holdInfo.value?.amount.value !== transactionAmount.value.value) {
    return formatAmount(holdInfo.value!.amount.currencyCode, holdInfo.value!.amount.value)
  } else {
    return null
  }
})

const transactionHoldForeignValue = computed((): string | null => {
  if (
    holdInfo.value?.foreignAmount &&
    holdInfo.value?.foreignAmount?.value !== foreignAmount.value?.value
  ) {
    return formatAmount(
      holdInfo.value!.foreignAmount!.currencyCode,
      holdInfo.value!.foreignAmount!.value
    )
  } else {
    return null
  }
})

const transactionForeignValue = computed((): string | null => {
  return foreignAmount.value
    ? formatAmount(foreignAmount.value!.currencyCode, foreignAmount.value!.value)
    : null
})

const transactionAmountValue = computed((): string => {
  return formatAmount(transactionAmount.value.currencyCode, transactionAmount.value.value)
})

const transactionMethod = computed((): string | null => {
  return cardPurchaseMethod.value ? formatMethod(cardPurchaseMethod.value!.method) : null
})

const transactionCreationDate = computed((): string => {
  return formatDate(transaction.value!.attributes.createdAt)
})

const transactionSettlementDate = computed((): string | null => {
  return transaction.value?.attributes.settledAt
    ? formatDate(transaction.value!.attributes.settledAt!)
    : null
})

const relativeDates = computed((): boolean => {
  return store.relativeDates
})

watch(transaction, (newValue) => {
  store.setPageTitle(newValue?.attributes.description)
})

watch(error, (newValue) => {
  store.setPageTitle(newValue?.name)
  store.setPageDescription(newValue?.message)
})

onMounted(() => {
  getTransaction()
})

function getTransaction(): void {
  UpFacade.getTransaction(transactionId.value)
    .then((response) => {
      transaction.value = response.data.data
      getAccount()
      if (transferAccountId.value) {
        getTransferAccount()
      }
      if (categoryId.value) {
        getCategory()
      }
      if (parentCategoryId.value) {
        getParentCategory()
      }
    })
    .catch((err) => {
      error.value = err
    })
}

function getAccount(): void {
  UpFacade.getAccount(accountId.value).then((response) => {
    account.value = response.data.data
  })
}

function getTransferAccount(): void {
  UpFacade.getAccount(transferAccountId.value ?? '').then((response) => {
    transferAccount.value = response.data.data
  })
}

function getCategory(): void {
  UpFacade.getCategory(categoryId.value ?? '').then((response) => {
    category.value = response.data.data
  })
}

function getParentCategory(): void {
  UpFacade.getCategory(parentCategoryId.value ?? '').then((response) => {
    parentCategory.value = response.data.data
  })
}

function listTransactionsByAccount(account: AccountResource): void {
  router.push({
    name: 'Transactions By Account',
    params: {
      account: account.id
    }
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

function listTransactionTags(): void {
  router.push({
    name: 'Transaction Tags'
  })
}

function formatDate(date: string): string {
  return relativeDates.value
    ? dayjs().to(dayjs(date))
    : dayjs(date).tz('Australia/Sydney').format('D MMM, YYYY h:mm A')
}

function formatMethod(method: string): string {
  const arr = method.toLowerCase().split('_')

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }

  let joined = arr.join(' ')

  if (cardPurchaseMethod.value?.cardNumberSuffix) {
    joined += ', x' + cardPurchaseMethod.value?.cardNumberSuffix
  }

  return joined
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
  <PageNotFound v-if="error" :error="error" />
  <Spinner v-else-if="!transaction" />
  <div v-else id="transactionDetail">
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="status"
        :detail-text="transactionStatus"
        class="list-group-item"
        left-text="Status"
      />
      <AttributeCell
        key="account"
        :detail-text="account?.attributes?.displayName"
        class="list-group-item list-group-item-action"
        left-text="Account"
        @click="listTransactionsByAccount(account!)"
      />
      <AttributeCell
        v-if="transferAccount"
        key="transferAccount"
        :detail-text="transferAccount?.attributes?.displayName"
        class="list-group-item list-group-item-action"
        left-text="Transfer Account"
        @click="listTransactionsByAccount(transferAccount)"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="description"
        :detail-text="transaction?.attributes?.description"
        class="list-group-item"
        left-text="Description"
      />
      <AttributeCell
        v-if="transaction?.attributes?.rawText"
        key="rawText"
        :detail-text="transaction?.attributes?.rawText"
        class="list-group-item"
        left-text="Raw Text"
      />
      <AttributeCell
        v-if="transaction?.attributes?.message && transaction?.attributes?.message !== ''"
        key="message"
        :detail-text="transaction?.attributes?.message"
        class="list-group-item"
        left-text="Message"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        v-if="transactionHoldValue"
        key="holdAmount"
        :detail-text="transactionHoldValue"
        class="list-group-item"
        left-text="Hold Amount"
      />
      <AttributeCell
        v-if="transactionHoldForeignValue"
        key="holdForeignAmount"
        :detail-text="transactionHoldForeignValue"
        class="list-group-item"
        left-text="Hold Foreign Amount"
      />
      <AttributeCell
        v-if="transactionForeignValue"
        key="foreignAmount"
        :detail-text="transactionForeignValue"
        class="list-group-item"
        left-text="Foreign Amount"
      />
      <AttributeCell
        key="amount"
        :detail-text="transactionAmountValue"
        class="list-group-item"
        left-text="Amount"
      />
      <AttributeCell
        v-if="transactionMethod"
        key="method"
        :detail-text="transactionMethod"
        class="list-group-item"
        left-text="Method"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        key="creationDate"
        :detail-text="transactionCreationDate"
        class="list-group-item"
        left-text="Creation Date"
      />
      <AttributeCell
        v-if="transactionSettlementDate"
        key="settlementDate"
        :detail-text="transactionSettlementDate"
        class="list-group-item"
        left-text="Settlement Date"
      />
    </transition-group>
    <transition-group class="list-group" name="flip-list" tag="ul">
      <AttributeCell
        v-if="parentCategory"
        key="parentCategory"
        :detail-text="parentCategory?.attributes?.name"
        class="list-group-item list-group-item-action"
        left-text="Parent Category"
        @click="listTransactionsByCategory(parentCategory)"
      />
      <AttributeCell
        v-if="category"
        key="category"
        :detail-text="category?.attributes?.name"
        class="list-group-item list-group-item-action"
        left-text="Category"
        @click="listTransactionsByCategory(category)"
      />
    </transition-group>
    <transition-group
      v-if="transaction?.relationships.tags.data.length !== 0"
      class="list-group"
      name="flip-list"
      tag="ul"
    >
      <AttributeCell
        key="tags"
        :detail-text="transaction?.relationships.tags.data.length.toString()"
        class="list-group-item list-group-item-action"
        left-text="Tags"
        @click="listTransactionTags"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 200ms ease;
}

.list-group-item-action:hover {
  cursor: pointer;
}

.list-group {
  margin-bottom: 15px;
}

#transactionDetail {
  margin: 15px;
}
</style>
