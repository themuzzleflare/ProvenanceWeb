// Copyright © 2021 Paul Tavitian

import MoneyObject from "@/upapi/MoneyObject";

export default interface HoldInfoObject {
  amount: MoneyObject;
  foreignAmount?: MoneyObject;
}
