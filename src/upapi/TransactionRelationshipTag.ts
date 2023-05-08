// Copyright © 2021-2022 Paul Tavitian

import type RelationshipData from '@/upapi/RelationshipData'
import type SelfLink from '@/upapi/SelfLink'

export default interface TransactionRelationshipTag {
  data: RelationshipData[]
  links?: SelfLink
}
