/*
 * Copyright © 2021-2024 Paul Tavitian.
 */

import type TransactionAttributes from '@/upapi/TransactionAttributes'
import type TransactionRelationships from '@/upapi/TransactionRelationships'
import type SelfLink from '@/upapi/SelfLink'

export default interface TransactionResource {
  type: string
  id: string
  attributes: TransactionAttributes
  relationships: TransactionRelationships
  links?: SelfLink | null
}

export const sampleTransactionResource: TransactionResource = {
  type: 'transactions',
  id: '2jdf7sa-694f-42e1-9782-dfj2k3j4k3j4',
  attributes: {
    status: 'HELD',
    rawText: 'WEST GOSFORD PHARMAC   WEST GO',
    description: 'Amcal Pharmacy',
    message: null,
    isCategorizable: true,
    holdInfo: {
      amount: {
        currencyCode: 'AUD',
        value: '-22.17',
        valueInBaseUnits: -2217
      },
      foreignAmount: null
    },
    roundUp: null,
    cashback: null,
    amount: {
      currencyCode: 'AUD',
      value: '-22.17',
      valueInBaseUnits: -2217
    },
    foreignAmount: null,
    cardPurchaseMethod: {
      method: 'CONTACTLESS',
      cardNumberSuffix: '3816'
    },
    settledAt: null,
    createdAt: '2024-06-19T08:44:25+10:00'
  },
  relationships: {
    account: {
      data: {
        type: 'accounts',
        id: 't35agds-885a-4133-9b1d-dfsdfdsf3'
      },
      links: {
        related: 'https://api.up.com.au/api/v1/accounts/t35agds-885a-4133-9b1d-dfsdfdsf3'
      }
    },
    transferAccount: {
      data: null
    },
    category: {
      data: {
        type: 'categories',
        id: 'health-and-medical'
      },
      links: {
        self: 'https://api.up.com.au/api/v1/transactions/2jdf7sa-694f-42e1-9782-dfj2k3j4k3j4/relationships/category',
        related: 'https://api.up.com.au/api/v1/categories/health-and-medical'
      }
    },
    parentCategory: {
      data: {
        type: 'categories',
        id: 'personal'
      },
      links: {
        related: 'https://api.up.com.au/api/v1/categories/personal'
      }
    },
    tags: {
      data: [],
      links: {
        self: 'https://api.up.com.au/api/v1/transactions/2jdf7sa-694f-42e1-9782-dfj2k3j4k3j4/relationships/tags'
      }
    }
  },
  links: {
    self: 'https://api.up.com.au/api/v1/transactions/2jdf7sa-694f-42e1-9782-dfj2k3j4k3j4'
  }
}
