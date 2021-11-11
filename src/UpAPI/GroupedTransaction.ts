// Copyright © 2021 Paul Tavitian

import TransactionResource from "@/UpAPI/TransactionResource";

export default class GroupedTransaction {
  date: string;
  transactions: TransactionResource[];

  constructor(date: string, transactions: TransactionResource[]) {
    this.date = date;
    this.transactions = transactions;
  }
}
