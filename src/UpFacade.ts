/*
 * Copyright © 2022-2024 Paul Tavitian.
 */

import { axiosInstance as axios } from '@/constants'
import type TransactionsResponse from '@/upapi/TransactionsResponse'
import type { AxiosResponse } from 'axios'
import type { TransactionResponse } from '@/upapi/TransactionResponse'
import type { AccountResponse } from '@/upapi/AccountResponse'
import type TagsResponse from '@/upapi/TagsResponse'
import type { CategoryResponse } from '@/upapi/CategoryResponse'
import type CategoriesResponse from '@/upapi/CategoriesResponse'
import type AccountsResponse from '@/upapi/AccountsResponse'

export default class UpFacade {
  static getTransactions(): Promise<AxiosResponse<TransactionsResponse>> {
    return axios.get<TransactionsResponse>('/transactions', {
      params: {
        'page[size]': '100'
      }
    })
  }

  static getTransactionsByAccount(accountId: string): Promise<AxiosResponse<TransactionsResponse>> {
    return axios.get<TransactionsResponse>(`/accounts/${accountId}/transactions`, {
      params: {
        'page[size]': '100'
      }
    })
  }

  static getTransactionsByCategory(
    categoryId: string
  ): Promise<AxiosResponse<TransactionsResponse>> {
    return axios.get<TransactionsResponse>('/transactions', {
      params: {
        'filter[category]': categoryId,
        'page[size]': '100'
      }
    })
  }

  static getTransactionsByTag(tagId: string): Promise<AxiosResponse<TransactionsResponse>> {
    return axios.get<TransactionsResponse>('/transactions', {
      params: {
        'filter[tag]': tagId,
        'page[size]': '100'
      }
    })
  }

  static getTransaction(transactionId: string): Promise<AxiosResponse<TransactionResponse>> {
    return axios.get<TransactionResponse>(`/transactions/${transactionId}`)
  }

  static getAccount(accountId: string): Promise<AxiosResponse<AccountResponse>> {
    return axios.get<AccountResponse>(`/accounts/${accountId}`)
  }

  static getCategory(categoryId: string): Promise<AxiosResponse<CategoryResponse>> {
    return axios.get<CategoryResponse>(`/categories/${categoryId}`)
  }

  static getCategories(): Promise<AxiosResponse<CategoriesResponse>> {
    return axios.get<CategoriesResponse>('/categories')
  }

  static getAccounts(): Promise<AxiosResponse<AccountsResponse>> {
    return axios.get<AccountsResponse>('/accounts', {
      params: {
        'page[size]': '100'
      }
    })
  }

  static getTags(): Promise<AxiosResponse<TagsResponse>> {
    return axios.get<TagsResponse>('/tags', {
      params: {
        'page[size]': '100'
      }
    })
  }
}
