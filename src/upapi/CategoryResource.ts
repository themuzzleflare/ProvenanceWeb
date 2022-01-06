// Copyright © 2021-2022 Paul Tavitian

import SelfLink from "@/upapi/SelfLink";
import CategoryAttributes from "@/upapi/CategoryAttributes";
import CategoryRelationships from "@/upapi/CategoryRelationships";

export default interface CategoryResource {
  type: string;
  id: string;
  attributes: CategoryAttributes;
  relationships: CategoryRelationships;
  links?: SelfLink;
}
