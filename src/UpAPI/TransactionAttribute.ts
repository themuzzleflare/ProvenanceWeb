// Copyright © 2021 Paul Tavitian

import MoneyObject from "@/UpAPI/MoneyObject";
import RoundUpObject from "@/UpAPI/RoundUpObject";
import TransactionStatusEnum from "@/UpAPI/TransactionStatusEnum";
import HoldInfoObject from "@/UpAPI/HoldInfoObject";
import CashbackObject from "@/UpAPI/CashbackObject";

export default interface TransactionAttribute {
  status: TransactionStatusEnum;
  rawText?: string;
  description: string;
  message?: string;
  holdInfo?: HoldInfoObject;
  roundUp?: RoundUpObject;
  cashback?: CashbackObject;
  amount: MoneyObject;
  foreignAmount?: MoneyObject;
  settledAt?: string;
  createdAt?: string;
  sortingDate: string;
}
