// Copyright © 2021 Paul Tavitian

import Pagination from "@/UpAPI/Pagination";
import TagResource from "@/UpAPI/TagResource";

export default interface TagsResponse {
  data: TagResource[];
  links: Pagination;
}
