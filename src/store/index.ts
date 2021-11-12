// Copyright © 2021 Paul Tavitian

import { createStore } from "vuex";
import { reactive } from "vue";

const defaultPageTitle = "Provenance";
const defaultPageDescription =
  "Provenance is a web application that interacts with the Up Banking Developer API to display information about your bank accounts, transactions, categories, tags and more.";

type State = {
  relativeDates: boolean;
  dateGrouping: boolean;
  pageTitle: string;
  pageDescription: string;
};

export default createStore({
  state: reactive<State>({
    relativeDates: localStorage.relativeDates === "1",
    dateGrouping: localStorage.dateGrouping === "1",
    pageTitle: defaultPageTitle,
    pageDescription: defaultPageDescription,
  }),
  mutations: {
    transactionGrouping(state: State, payload: boolean): void {
      localStorage.dateGrouping = payload ? "1" : "0";
      state.dateGrouping = payload;
    },
    dateStyle(state: State, payload: boolean): void {
      localStorage.relativeDates = payload ? "1" : "0";
      state.relativeDates = payload;
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
  },
});
