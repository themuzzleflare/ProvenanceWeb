// Copyright © 2021 Paul Tavitian

import SelfLink from "@/UpAPI/SelfLink";
import CategoryAttribute from "@/UpAPI/CategoryAttribute";
import CategoryRelationship from "@/UpAPI/CategoryRelationship";

export default interface CategoryResource {
  type: string;
  id: string;
  attributes: CategoryAttribute;
  relationships: CategoryRelationship;
  links?: SelfLink;
}
