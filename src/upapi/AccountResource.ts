// Copyright © 2021 Paul Tavitian

import SelfLink from "@/upapi/SelfLink";
import AccountAttribute from "@/upapi/AccountAttribute";
import AccountRelationship from "@/upapi/AccountRelationship";

export default interface AccountResource {
  type: string;
  id: string;
  attributes: AccountAttribute;
  relationships: AccountRelationship;
  links?: SelfLink;
}
