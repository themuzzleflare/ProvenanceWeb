/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import type TransactionResource from '@/upapi/TransactionResource'

export default interface GroupedTransactions {
  date: string
  transactions: TransactionResource[]
}
