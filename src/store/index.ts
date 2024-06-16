/*
 * Copyright © 2023-2024 Paul Tavitian.
 */

import { defineStore } from 'pinia'

import { defaultPageDescription, defaultPageTitle } from '@/constants'
import { ref } from 'vue'

export const useProvenanceStore = defineStore('provenance', () => {
  const relativeDates = ref(localStorage.relativeDates === '1')
  const dateGrouping = ref(localStorage.dateGrouping === '1')
  const pageTitle = ref(defaultPageTitle)
  const pageDescription = ref(defaultPageDescription)
  const apiKey = ref(localStorage.apiKey)

  function setRelativeDates(payload: boolean): void {
    localStorage.relativeDates = payload ? '1' : '0'
    relativeDates.value = payload
  }

  function setDateGrouping(payload: boolean): void {
    localStorage.dateGrouping = payload ? '1' : '0'
    dateGrouping.value = payload
  }

  function setPageTitle(title: string | null | undefined): void {
    title += ' | Provenance'

    pageTitle.value = title || defaultPageTitle

    document.title = title || defaultPageTitle
    document
      .querySelectorAll('.page-title-meta')
      .forEach((el) => el.setAttribute('content', title || defaultPageTitle))
  }

  function setPageDescription(description: string | null | undefined): void {
    pageDescription.value = description || defaultPageDescription

    document
      .querySelectorAll('.page-description-meta')
      .forEach((el) => el.setAttribute('content', description || defaultPageDescription))
  }

  function setApiKey(key: string): void {
    localStorage.apiKey = key
    apiKey.value = key
  }

  return {
    relativeDates,
    dateGrouping,
    pageTitle,
    pageDescription,
    apiKey,
    setRelativeDates,
    setDateGrouping,
    setPageTitle,
    setPageDescription,
    setApiKey
  }
})

export default useProvenanceStore
