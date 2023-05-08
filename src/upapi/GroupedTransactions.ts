// Copyright © 2021-2022 Paul Tavitian

import type TransactionResource from '@/upapi/TransactionResource'

export default interface GroupedTransactions {
  date: string
  transactions: TransactionResource[]
}
