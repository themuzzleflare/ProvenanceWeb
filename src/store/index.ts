/*
 * Copyright © 2023 Paul Tavitian.
 */

// Copyright © 2021-2022 Paul Tavitian

import { defineStore } from 'pinia'

import { defaultPageDescription, defaultPageTitle } from '@/constants'
import type { State } from '@/constants'

export const useProvenanceStore = defineStore('provenanceStore', {
  // convert to a function
  state: (): State => ({
    relativeDates: localStorage.relativeDates === '1',
    dateGrouping: localStorage.dateGrouping === '1',
    pageTitle: defaultPageTitle,
    pageDescription: defaultPageDescription,
    apiKey: localStorage.apiKey
  }),
  actions: {
    setRelativeDates(payload: boolean): void {
      localStorage.relativeDates = payload ? '1' : '0'
      this.relativeDates = payload
    },
    setDateGrouping(payload: boolean): void {
      localStorage.dateGrouping = payload ? '1' : '0'
      this.dateGrouping = payload
    },
    setPageTitle(pageTitle: string): void {
      if (!pageTitle) pageTitle = defaultPageTitle
      else pageTitle += ' | Provenance'
      this.pageTitle = pageTitle
      document.title = pageTitle
      document
        .querySelectorAll('.page-title-meta')
        .forEach((el) => el.setAttribute('content', pageTitle))
    },
    setPageDescription(pageDescription: string): void {
      if (!pageDescription) pageDescription = defaultPageDescription
      this.pageDescription = pageDescription
      document
        .querySelectorAll('.page-description-meta')
        .forEach((el) => el.setAttribute('content', pageDescription))
    },
    setApiKey(apiKey: string): void {
      localStorage.apiKey = apiKey
      this.apiKey = apiKey
    }
  }
})

export default useProvenanceStore
