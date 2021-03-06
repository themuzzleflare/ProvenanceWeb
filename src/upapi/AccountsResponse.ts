// Copyright © 2021-2022 Paul Tavitian

import Pagination from "@/upapi/Pagination";
import AccountResource from "@/upapi/AccountResource";

export default interface AccountsResponse {
  data: AccountResource[];
  links: Pagination;
}
