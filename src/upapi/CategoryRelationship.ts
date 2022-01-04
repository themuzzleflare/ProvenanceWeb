// Copyright © 2021-2022 Paul Tavitian

import CategoryRelationshipParent from "@/upapi/CategoryRelationshipParent";
import CategoryRelationshipChildren from "@/upapi/CategoryRelationshipChildren";

export default interface CategoryRelationship {
  parent: CategoryRelationshipParent;
  children: CategoryRelationshipChildren;
}
