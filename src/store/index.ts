// Copyright © 2021 Paul Tavitian

import { createStore } from "vuex";

export default createStore({
  state: {
    relativeDates: localStorage.relativeDates === "1",
    dateGrouping: localStorage.dateGrouping === "1",
  },
  mutations: {
    transactionGrouping(state, payload) {
      localStorage.dateGrouping = payload ? "1" : "0";
      state.dateGrouping = payload;
    },
    dateStyle(state, payload) {
      localStorage.relativeDates = payload ? "1" : "0";
      state.relativeDates = payload;
    },
  },
  actions: {},
  modules: {},
});
