// Copyright © 2021-2022 Paul Tavitian

import TransactionResource from "@/upapi/TransactionResource";

export default interface GroupedTransactions {
  date: string;
  transactions: TransactionResource[];
}
