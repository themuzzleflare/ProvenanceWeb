/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import type TagRelationships from '@/upapi/TagRelationships'

export default interface TagResource {
  type: string
  id: string
  relationships?: TagRelationships
}
