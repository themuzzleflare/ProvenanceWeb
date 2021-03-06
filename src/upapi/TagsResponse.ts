// Copyright © 2021-2022 Paul Tavitian

import Pagination from "@/upapi/Pagination";
import TagResource from "@/upapi/TagResource";

export default interface TagsResponse {
  data: TagResource[];
  links: Pagination;
}
