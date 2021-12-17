// Copyright © 2021 Paul Tavitian

import CategoryRelationshipParent from "@/upapi/CategoryRelationshipParent";
import CategoryRelationshipChildren from "@/upapi/CategoryRelationshipChildren";

export default interface CategoryRelationship {
  parent: CategoryRelationshipParent;
  children: CategoryRelationshipChildren;
}
