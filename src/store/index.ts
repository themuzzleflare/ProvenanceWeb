// Copyright © 2021 Paul Tavitian

import { createStore } from "vuex";
import { reactive } from "vue";

type State = {
  relativeDates: boolean;
  dateGrouping: boolean;
};

export default createStore({
  state: reactive<State>({
    relativeDates: localStorage.relativeDates === "1",
    dateGrouping: localStorage.dateGrouping === "1",
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
  },
});
