/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

import type RelationshipData from '@/upapi/RelationshipData'
import type RelatedLink from '@/upapi/RelatedLink'

export default interface TransactionRelationshipAccount {
  data: RelationshipData
  links?: RelatedLink | null
}
