// Copyright © 2021 Paul Tavitian

import RelationshipData from "@/UpAPI/RelationshipData";
import SelfLink from "@/UpAPI/SelfLink";

export default interface TransactionRelationshipTag {
  data: RelationshipData[];
  links?: SelfLink;
}
