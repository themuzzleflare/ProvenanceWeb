// Copyright © 2021-2022 Paul Tavitian

import RelationshipData from "@/upapi/RelationshipData";
import SelfLink from "@/upapi/SelfLink";

export default interface TransactionRelationshipTag {
  data: RelationshipData[];
  links?: SelfLink;
}
