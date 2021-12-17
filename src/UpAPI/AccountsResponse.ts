// Copyright © 2021 Paul Tavitian

import Pagination from "@/UpAPI/Pagination";
import AccountResource from "@/UpAPI/AccountResource";

export default interface AccountsResponse {
  data: AccountResource[];
  links: Pagination;
}