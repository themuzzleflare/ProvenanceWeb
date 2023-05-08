// Copyright © 2021-2022 Paul Tavitian

import type Pagination from '@/upapi/Pagination'
import type TagResource from '@/upapi/TagResource'

export default interface TagsResponse {
  data: TagResource[]
  links: Pagination
}
