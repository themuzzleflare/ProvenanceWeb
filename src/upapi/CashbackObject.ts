/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

import type MoneyObject from '@/upapi/MoneyObject'

export default interface CashbackObject {
  description: string
  amount: MoneyObject
}
