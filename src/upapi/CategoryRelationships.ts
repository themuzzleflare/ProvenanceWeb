/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

import type CategoryRelationshipParent from '@/upapi/CategoryRelationshipParent'
import type CategoryRelationshipChildren from '@/upapi/CategoryRelationshipChildren'

export default interface CategoryRelationships {
  parent: CategoryRelationshipParent
  children: CategoryRelationshipChildren
}
