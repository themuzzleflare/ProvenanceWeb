// Copyright © 2021 Paul Tavitian

import TagRelationship from "@/upapi/TagRelationship";

export default interface TagResource {
  type: string;
  id: string;
  relationships?: TagRelationship;
}
