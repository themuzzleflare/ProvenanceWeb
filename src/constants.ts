/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { useProvenanceStore } from '@/store'

export const defaultPageTitle: string = 'Provenance'
export const defaultPageDescription: string =
  'Provenance is a web application that interacts with the Up Banking Developer API to display information about your bank accounts, transactions, categories, tags and more.'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.up.com.au/api/v1',
  transformRequest(data, headers) {
    const store = useProvenanceStore()
    headers['Authorization'] = `Bearer ${store.apiKey}`
  }
})
