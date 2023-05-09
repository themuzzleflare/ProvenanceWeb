/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import type TransactionRelationshipTag from '@/upapi/TransactionRelationshipTag'
import type TransactionRelationshipCategory from '@/upapi/TransactionRelationshipCategory'
import type TransactionRelationshipTransferAccount from '@/upapi/TransactionRelationshipTransferAccount'
import type TransactionRelationshipAccount from '@/upapi/TransactionRelationshipAccount'

export default interface TransactionRelationships {
  account: TransactionRelationshipAccount
  transferAccount: TransactionRelationshipTransferAccount
  category: TransactionRelationshipCategory
  parentCategory: TransactionRelationshipCategory
  tags: TransactionRelationshipTag
}
