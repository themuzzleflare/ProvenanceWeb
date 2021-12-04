// Copyright © 2021 Paul Tavitian

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { trackRouter } from "vue-gtag-next";

import store from "@/store";

import Transactions from "@/views/Transactions.vue";
import Accounts from "@/views/Accounts.vue";
import Tags from "@/views/Tags.vue";
import Categories from "@/views/Categories.vue";
import About from "@/views/About.vue";

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
    component: About,
    meta: {
      title: "About",
    },
  },
  {
    path: "/accounts/:account",
    name: "Transactions By Account",
    component: () =>
      import(
        /* webpackChunkName: "transactionsByAccount" */ "@/views/TransactionsByAccount.vue"
      ),
  },
  {
    path: "/tags/:tag",
    name: "Transactions By Tag",
    component: () =>
      import(
        /* webpackChunkName: "transactionsByTag" */ "@/views/TransactionsByTag.vue"
      ),
  },
  {
    path: "/categories/:category",
    name: "Transactions By Category",
    component: () =>
      import(
        /* webpackChunkName: "transactionsByCategory" */ "@/views/TransactionsByCategory.vue"
      ),
  },
  {
    path: "/transactions/:transaction",
    name: "Transaction Detail",
    component: () =>
      import(
        /* webpackChunkName: "transactionDetail" */ "@/views/TransactionDetail.vue"
      ),
  },
  {
    path: "/transactions/:transaction/tags",
    name: "Transaction Tags",
    component: () =>
      import(
        /* webpackChunkName: "transactionTags" */ "@/views/TransactionTags.vue"
      ),
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
