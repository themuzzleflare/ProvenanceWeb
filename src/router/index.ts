// Copyright © 2021 Paul Tavitian

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { trackRouter } from "vue-gtag-next";
import Transactions from "@/views/Transactions.vue";
import TransactionDetail from "@/views/TransactionDetail.vue";
import TransactionsByTag from "@/views/TransactionsByTag.vue";
import TransactionsByAccount from "@/views/TransactionsByAccount.vue";
import Categories from "@/views/Categories.vue";
import TransactionsByCategory from "@/views/TransactionsByCategory.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import TransactionTags from "@/views/TransactionTags.vue";
import Accounts from "@/views/Accounts.vue";
import Tags from "@/views/Tags.vue";
import About from "@/views/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/transactions",
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
  },
  {
    path: "/tags",
    name: "Tags",
    component: Tags,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/transactions/:transaction",
    name: "Transaction Detail",
    component: TransactionDetail,
  },
  {
    path: "/accounts/:account",
    name: "Transactions By Account",
    component: TransactionsByAccount,
  },
  {
    path: "/categories/:category",
    name: "Transactions By Category",
    component: TransactionsByCategory,
  },
  {
    path: "/tags/:tag",
    name: "Transactions By Tag",
    component: TransactionsByTag,
  },
  {
    path: "/transactions/:transaction/tags",
    name: "Transaction Tags",
    component: TransactionTags,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

trackRouter(router);

export default router;
