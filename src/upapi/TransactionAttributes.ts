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
  rawText?: string
  description: string
  message?: string
  holdInfo?: HoldInfoObject
  roundUp?: RoundUpObject
  cashback?: CashbackObject
  amount: MoneyObject
  foreignAmount?: MoneyObject
  cardPurchaseMethod?: CardPurchaseMethodObject
  settledAt?: string
  createdAt: string
  sortingDate: string
}
