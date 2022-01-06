// Copyright © 2021-2022 Paul Tavitian

import MoneyObject from "@/upapi/MoneyObject";
import RoundUpObject from "@/upapi/RoundUpObject";
import HoldInfoObject from "@/upapi/HoldInfoObject";
import CashbackObject from "@/upapi/CashbackObject";

export default interface TransactionAttributes {
  status: string;
  rawText?: string;
  description: string;
  message?: string;
  holdInfo?: HoldInfoObject;
  roundUp?: RoundUpObject;
  cashback?: CashbackObject;
  amount: MoneyObject;
  foreignAmount?: MoneyObject;
  settledAt?: string;
  createdAt: string;
  sortingDate: string;
}
