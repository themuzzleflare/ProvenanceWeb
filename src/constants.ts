// Copyright © 2021-2022 Paul Tavitian

import axios from 'axios'
import { useProvenanceStore } from '@/store'

export const defaultPageTitle = 'Provenance'
export const defaultPageDescription =
  'Provenance is a web application that interacts with the Up Banking Developer API to display information about your bank accounts, transactions, categories, tags and more.'

export const axiosInstance = axios.create({
  baseURL: 'https://api.up.com.au/api/v1',
  transformRequest(data, headers) {
    ;(headers ?? {})['Authorization'] = `Bearer ${useProvenanceStore().apiKey}`
  }
})

export interface State {
  relativeDates: boolean
  dateGrouping: boolean
  pageTitle: string
  pageDescription: string
  apiKey: string
}
