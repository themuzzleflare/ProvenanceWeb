// Copyright © 2021-2022 Paul Tavitian

import type SelfLink from '@/upapi/SelfLink'
import type CategoryAttributes from '@/upapi/CategoryAttributes'
import type CategoryRelationships from '@/upapi/CategoryRelationships'

export default interface CategoryResource {
  type: string
  id: string
  attributes: CategoryAttributes
  relationships: CategoryRelationships
  links?: SelfLink
}
