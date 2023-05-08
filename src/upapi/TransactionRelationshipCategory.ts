// Copyright © 2021-2022 Paul Tavitian

import type RelationshipData from '@/upapi/RelationshipData'
import type RelatedLink from '@/upapi/RelatedLink'

export default interface TransactionRelationshipCategory {
  data?: RelationshipData
  links?: RelatedLink
}
