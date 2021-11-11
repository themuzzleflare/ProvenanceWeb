// Copyright © 2021 Paul Tavitian

import SelfLink from "@/UpAPI/SelfLink";
import AccountAttribute from "@/UpAPI/AccountAttribute";
import AccountRelationship from "@/UpAPI/AccountRelationship";

export default interface AccountResource {
  type: string;
  id: string;
  attributes: AccountAttribute;
  relationships: AccountRelationship;
  links?: SelfLink;
}
