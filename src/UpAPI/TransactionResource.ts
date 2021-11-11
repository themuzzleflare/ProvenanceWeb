// Copyright © 2021 Paul Tavitian

import TransactionAttribute from "@/UpAPI/TransactionAttribute";
import TransactionRelationship from "@/UpAPI/TransactionRelationship";
import SelfLink from "@/UpAPI/SelfLink";

export default interface TransactionResource {
  type: string;
  id: string;
  attributes: TransactionAttribute;
  relationships: TransactionRelationship;
  links?: SelfLink;
}
