/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import type SelfLink from '@/upapi/SelfLink'
import type AccountAttributes from '@/upapi/AccountAttributes'
import type AccountRelationships from '@/upapi/AccountRelationships'

export default interface AccountResource {
  type: string
  id: string
  attributes: AccountAttributes
  relationships: AccountRelationships
  links?: SelfLink
}
