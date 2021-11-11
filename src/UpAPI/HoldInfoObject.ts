// Copyright © 2021 Paul Tavitian

import MoneyObject from "@/UpAPI/MoneyObject";

export default interface HoldInfoObject {
  amount: MoneyObject;
  foreignAmount?: MoneyObject;
}
