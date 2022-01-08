// Copyright © 2021-2022 Paul Tavitian

import RelationshipData from "@/upapi/RelationshipData";
import RelatedLink from "@/upapi/RelatedLink";

export default interface TransactionRelationshipCategory {
  data?: RelationshipData;
  links?: RelatedLink;
}