// Copyright © 2021 Paul Tavitian

import CategoryRelationshipParent from "@/UpAPI/CategoryRelationshipParent";
import CategoryRelationshipChildren from "@/UpAPI/CategoryRelationshipChildren";

export default interface CategoryRelationship {
  parent: CategoryRelationshipParent;
  children: CategoryRelationshipChildren;
}
