// Copyright © 2021-2022 Paul Tavitian

import MoneyObject from "@/upapi/MoneyObject";

export default interface RoundUpObject {
  amount: MoneyObject;
  boostPortion?: MoneyObject;
}
