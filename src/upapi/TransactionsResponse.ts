// Copyright © 2021 Paul Tavitian

import TransactionResource from "@/upapi/TransactionResource";
import Pagination from "@/upapi/Pagination";

export default interface TransactionsResponse {
  data: TransactionResource[];
  links: Pagination;
}
