/*
 * Copyright © 2023 Paul Tavitian.
 */

import { defineStore } from 'pinia'

import { defaultPageDescription, defaultPageTitle } from '@/constants'
import { ref } from 'vue'

export const useProvenanceStore = defineStore('provenanceStore', () => {
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

  function setPageTitle(title: string): void {
    if (!title) title = defaultPageTitle
    else title += ' | Provenance'
    pageTitle.value = title
    document.title = title
    document.querySelectorAll('.page-title-meta').forEach((el) => el.setAttribute('content', title))
  }

  function setPageDescription(description: string): void {
    if (!description) description = defaultPageDescription
    pageDescription.value = description
    document
      .querySelectorAll('.page-description-meta')
      .forEach((el) => el.setAttribute('content', description))
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
