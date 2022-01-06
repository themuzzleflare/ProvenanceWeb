// Copyright © 2021-2022 Paul Tavitian

import SelfLink from "@/upapi/SelfLink";
import AccountAttributes from "@/upapi/AccountAttributes";
import AccountRelationships from "@/upapi/AccountRelationships";

export default interface AccountResource {
  type: string;
  id: string;
  attributes: AccountAttributes;
  relationships: AccountRelationships;
  links?: SelfLink;
}
