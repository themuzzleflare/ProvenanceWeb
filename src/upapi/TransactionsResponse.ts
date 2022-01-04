// Copyright © 2021-2022 Paul Tavitian

import TransactionResource from "@/upapi/TransactionResource";
import Pagination from "@/upapi/Pagination";

export default interface TransactionsResponse {
  data: TransactionResource[];
  links: Pagination;
}
