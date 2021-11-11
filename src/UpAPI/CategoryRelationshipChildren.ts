// Copyright © 2021 Paul Tavitian

import RelationshipData from "@/UpAPI/RelationshipData";
import RelatedLink from "@/UpAPI/RelatedLink";

export default interface CategoryRelationshipChildren {
  data: RelationshipData[];
  links?: RelatedLink;
}
