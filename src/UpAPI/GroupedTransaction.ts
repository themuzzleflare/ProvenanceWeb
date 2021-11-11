// Copyright © 2021 Paul Tavitian

import TransactionResource from "@/UpAPI/TransactionResource";

export default interface GroupedTransaction {
  date: string;
  transactions: TransactionResource[];
}
