// Copyright © 2021 Paul Tavitian

import SelfLink from "@/upapi/SelfLink";
import CategoryAttribute from "@/upapi/CategoryAttribute";
import CategoryRelationship from "@/upapi/CategoryRelationship";

export default interface CategoryResource {
  type: string;
  id: string;
  attributes: CategoryAttribute;
  relationships: CategoryRelationship;
  links?: SelfLink;
}
