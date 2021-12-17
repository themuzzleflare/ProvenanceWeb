// Copyright © 2021 Paul Tavitian

import RelationshipData from "@/upapi/RelationshipData";
import SelfLink from "@/upapi/SelfLink";

export default interface TransactionRelationshipTag {
  data: RelationshipData[];
  links?: SelfLink;
}
