// Copyright © 2021-2022 Paul Tavitian

import TransactionRelationshipTag from "@/upapi/TransactionRelationshipTag";
import TransactionRelationshipCategory from "@/upapi/TransactionRelationshipCategory";
import TransactionRelationshipTransferAccount from "@/upapi/TransactionRelationshipTransferAccount";
import TransactionRelationshipAccount from "@/upapi/TransactionRelationshipAccount";

export default interface TransactionRelationship {
  account: TransactionRelationshipAccount;
  transferAccount: TransactionRelationshipTransferAccount;
  category: TransactionRelationshipCategory;
  parentCategory: TransactionRelationshipCategory;
  tags: TransactionRelationshipTag;
}
