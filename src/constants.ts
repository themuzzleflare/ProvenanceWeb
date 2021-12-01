// Copyright © 2021 Paul Tavitian

export const defaultPageTitle = "Provenance";
export const defaultPageDescription =
  "Provenance is a web application that interacts with the Up Banking Developer API to display information about your bank accounts, transactions, categories, tags and more.";

export interface State {
  relativeDates: boolean;
  dateGrouping: boolean;
  pageTitle: string;
  pageDescription: string;
}
