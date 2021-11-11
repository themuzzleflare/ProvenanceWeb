// Copyright © 2021 Paul Tavitian

import TransactionResource from "@/UpAPI/TransactionResource";
import Pagination from "@/UpAPI/Pagination";

export default interface Transaction {
  data: TransactionResource[];
  links: Pagination;
}
