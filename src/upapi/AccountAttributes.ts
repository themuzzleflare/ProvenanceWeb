// Copyright © 2021-2022 Paul Tavitian

import type MoneyObject from '@/upapi/MoneyObject'

export default interface AccountAttributes {
  displayName: string
  accountType: string
  balance: MoneyObject
  createdAt: string
}
