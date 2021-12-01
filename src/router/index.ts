// Copyright © 2021 Paul Tavitian

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { trackRouter } from "vue-gtag-next";

import store from "@/store";

import Transactions from "@/views/Transactions.vue";
import Accounts from "@/views/Accounts.vue";
import Tags from "@/views/Tags.vue";
import Categories from "@/views/Categories.vue";

import TransactionsByAccount from "@/views/TransactionsByAccount.vue";
import TransactionsByTag from "@/views/TransactionsByTag.vue";
import TransactionsByCategory from "@/views/TransactionsByCategory.vue";

import TransactionDetail from "@/views/TransactionDetail.vue";
import TransactionTags from "@/views/TransactionTags.vue";

import PageNotFound from "@/views/PageNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/transactions",
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
    meta: {
      title: "Transactions",
      description: "View your transactions",
    },
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
    meta: {
      title: "Accounts",
      description: "View your accounts",
    },
  },
  {
    path: "/tags",
    name: "Tags",
    component: Tags,
    meta: {
      title: "Tags",
      description: "View your tags",
    },
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    meta: {
      title: "Categories",
      description: "View your categories",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    meta: {
      title: "About",
    },
  },
  {
    path: "/accounts/:account",
    name: "Transactions By Account",
    component: TransactionsByAccount,
  },
  {
    path: "/tags/:tag",
    name: "Transactions By Tag",
    component: TransactionsByTag,
  },
  {
    path: "/categories/:category",
    name: "Transactions By Category",
    component: TransactionsByCategory,
  },
  {
    path: "/transactions/:transaction",
    name: "Transaction Detail",
    component: TransactionDetail,
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
    meta: {
      title: "404",
      description: "Page not found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.afterEach((to) => {
  store.commit("setPageTitle", to.meta.title);
  store.commit("setPageDescription", to.meta.description);
});

trackRouter(router);

export default router;
