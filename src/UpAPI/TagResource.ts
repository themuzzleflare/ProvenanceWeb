// Copyright © 2021 Paul Tavitian

import TagRelationship from "@/UpAPI/TagRelationship";

export default interface TagResource {
  type: string;
  id: string;
  relationships?: TagRelationship;
}
