/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

import type MoneyObject from '@/upapi/MoneyObject'

export default interface HoldInfoObject {
  amount: MoneyObject
  foreignAmount?: MoneyObject | null
}
