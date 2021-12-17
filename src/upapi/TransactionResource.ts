// Copyright © 2021 Paul Tavitian

import TransactionAttribute from "@/upapi/TransactionAttribute";
import TransactionRelationship from "@/upapi/TransactionRelationship";
import SelfLink from "@/upapi/SelfLink";

export default interface TransactionResource {
  type: string;
  id: string;
  attributes: TransactionAttribute;
  relationships: TransactionRelationship;
  links?: SelfLink;
}
