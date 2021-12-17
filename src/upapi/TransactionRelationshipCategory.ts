// Copyright © 2021 Paul Tavitian

import RelationshipData from "@/upapi/RelationshipData";
import RelatedLink from "@/upapi/RelatedLink";

export default interface TransactionRelationshipCategory {
  data?: RelationshipData;
  links?: RelatedLink;
}
