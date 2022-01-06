// Copyright © 2021-2022 Paul Tavitian

import TransactionAttributes from "@/upapi/TransactionAttributes";
import TransactionRelationships from "@/upapi/TransactionRelationships";
import SelfLink from "@/upapi/SelfLink";

export default interface TransactionResource {
  type: string;
  id: string;
  attributes: TransactionAttributes;
  relationships: TransactionRelationships;
  links?: SelfLink;
}
