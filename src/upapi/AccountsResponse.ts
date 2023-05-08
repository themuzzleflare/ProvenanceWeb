// Copyright © 2021-2022 Paul Tavitian

import type Pagination from '@/upapi/Pagination'
import type AccountResource from '@/upapi/AccountResource'

export default interface AccountsResponse {
  data: AccountResource[]
  links: Pagination
}
