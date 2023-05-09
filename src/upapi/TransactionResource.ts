/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import type TransactionAttributes from '@/upapi/TransactionAttributes'
import type TransactionRelationships from '@/upapi/TransactionRelationships'
import type SelfLink from '@/upapi/SelfLink'

export default interface TransactionResource {
  type: string
  id: string
  attributes: TransactionAttributes
  relationships: TransactionRelationships
  links?: SelfLink
}
