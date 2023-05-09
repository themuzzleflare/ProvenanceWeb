/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import type TransactionResource from '@/upapi/TransactionResource'
import type Pagination from '@/upapi/Pagination'

export default interface TransactionsResponse {
  data: TransactionResource[]
  links: Pagination
}
