// Copyright © 2021 Paul Tavitian

import MoneyObject from "@/UpAPI/MoneyObject";
import AccountTypeEnum from "@/UpAPI/AccountTypeEnum";

export default interface AccountAttribute {
  displayName: string;
  accountType: AccountTypeEnum;
  balance: MoneyObject;
  createdAt: string;
}
