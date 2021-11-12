// Copyright © 2021 Paul Tavitian

import MoneyObject from "@/UpAPI/MoneyObject";

export default interface AccountAttribute {
  displayName: string;
  accountType: string;
  balance: MoneyObject;
  createdAt: string;
}
