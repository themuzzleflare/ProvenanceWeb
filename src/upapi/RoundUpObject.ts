/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import type MoneyObject from '@/upapi/MoneyObject'

export default interface RoundUpObject {
  amount: MoneyObject
  boostPortion?: MoneyObject
}
