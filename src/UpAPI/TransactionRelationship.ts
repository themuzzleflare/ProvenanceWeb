// Copyright © 2021 Paul Tavitian

import TransactionRelationshipTag from "@/UpAPI/TransactionRelationshipTag";
import TransactionRelationshipCategory from "@/UpAPI/TransactionRelationshipCategory";
import TransactionRelationshipTransferAccount from "@/UpAPI/TransactionRelationshipTransferAccount";
import TransactionRelationshipAccount from "@/UpAPI/TransactionRelationshipAccount";

export default interface TransactionRelationship {
  account: TransactionRelationshipAccount;
  transferAccount: TransactionRelationshipTransferAccount;
  category: TransactionRelationshipCategory;
  parentCategory: TransactionRelationshipCategory;
  tags: TransactionRelationshipTag;
}
