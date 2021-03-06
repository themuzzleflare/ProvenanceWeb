// Copyright © 2021-2022 Paul Tavitian

import { createStore } from "vuex";

import { defaultPageDescription, defaultPageTitle, State } from "@/constants";

export default createStore<State>({
  state: {
    relativeDates: localStorage.relativeDates === "1",
    dateGrouping: localStorage.dateGrouping === "1",
    pageTitle: defaultPageTitle,
    pageDescription: defaultPageDescription,
    apiKey: localStorage.apiKey,
  },
  mutations: {
    setRelativeDates(state: State, payload: boolean): void {
      localStorage.relativeDates = payload ? "1" : "0";
      state.relativeDates = payload;
    },
    setDateGrouping(state: State, payload: boolean): void {
      localStorage.dateGrouping = payload ? "1" : "0";
      state.dateGrouping = payload;
    },
    setPageTitle(state: State, pageTitle: string): void {
      if (!pageTitle) pageTitle = defaultPageTitle;
      else pageTitle += " | Provenance";
      state.pageTitle = pageTitle;
      document.title = pageTitle;
      document
        .querySelectorAll(".page-title-meta")
        .forEach((el) => el.setAttribute("content", pageTitle));
    },
    setPageDescription(state: State, pageDescription: string): void {
      if (!pageDescription) pageDescription = defaultPageDescription;
      state.pageDescription = pageDescription;
      document
        .querySelectorAll(".page-description-meta")
        .forEach((el) => el.setAttribute("content", pageDescription));
    },
    setApiKey(state: State, apiKey: string): void {
      localStorage.apiKey = apiKey;
      state.apiKey = apiKey;
    },
  },
});
