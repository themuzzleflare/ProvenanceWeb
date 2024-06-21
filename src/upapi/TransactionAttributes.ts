/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

import type MoneyObject from '@/upapi/MoneyObject'
import type RoundUpObject from '@/upapi/RoundUpObject'
import type HoldInfoObject from '@/upapi/HoldInfoObject'
import type CashbackObject from '@/upapi/CashbackObject'
import type CardPurchaseMethodObject from '@/upapi/CardPurchaseMethodObject'

export default interface TransactionAttributes {
  status: string
  rawText?: string | null
  description: string
  message?: string | null
  isCategorizable: boolean // Boolean flag set to true on transactions that support the use of categories.
  holdInfo?: HoldInfoObject | null
  roundUp?: RoundUpObject | null
  cashback?: CashbackObject | null
  amount: MoneyObject
  foreignAmount?: MoneyObject | null
  cardPurchaseMethod?: CardPurchaseMethodObject | null
  settledAt?: string | null
  createdAt: string
  sortingDate?: string | null
}
