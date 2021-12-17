// Copyright © 2021 Paul Tavitian

import TransactionResource from "@/upapi/TransactionResource";

export default interface GroupedTransaction {
  date: string;
  transactions: TransactionResource[];
}
