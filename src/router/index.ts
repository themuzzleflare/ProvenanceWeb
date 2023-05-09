/*
 * Copyright © 2021-2023 Paul Tavitian.
 */

import { createRouter, createWebHistory } from 'vue-router'
import { trackRouter } from 'vue-gtag-next'

import { useProvenanceStore } from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/transactions'
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: () =>
        import(/* webpackChunkName: "transactions" */ '@/views/TransactionsComp.vue'),
      meta: {
        title: 'Transactions',
        description: 'View your transactions'
      }
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: () => import(/* webpackChunkName: "accounts" */ '@/views/Accounts.vue'),
      meta: {
        title: 'Accounts',
        description: 'View your accounts'
      }
    },
    {
      path: '/tags',
      name: 'Tags',
      component: () => import(/* webpackChunkName: "tags" */ '@/views/Tags.vue'),
      meta: {
        title: 'Tags',
        description: 'View your tags'
      }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import(/* webpackChunkName: "categories" */ '@/views/Categories.vue'),
      meta: {
        title: 'Categories',
        description: 'View your categories'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '/accounts/:account',
      name: 'Transactions By Account',
      component: () =>
        import(/* webpackChunkName: "transactionsByAccount" */ '@/views/TransactionsByAccount.vue')
    },
    {
      path: '/tags/:tag',
      name: 'Transactions By Tag',
      component: () =>
        import(/* webpackChunkName: "transactionsByTag" */ '@/views/TransactionsByTag.vue')
    },
    {
      path: '/categories/:category',
      name: 'Transactions By Category',
      component: () =>
        import(
          /* webpackChunkName: "transactionsByCategory" */ '@/views/TransactionsByCategory.vue'
        )
    },
    {
      path: '/transactions/:transaction',
      name: 'Transaction Detail',
      component: () =>
        import(/* webpackChunkName: "transactionDetail" */ '@/views/TransactionDetail.vue')
    },
    {
      path: '/transactions/:transaction/tags',
      name: 'Transaction Tags',
      component: () =>
        import(/* webpackChunkName: "transactionTags" */ '@/views/TransactionTags.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/PageNotFound.vue'),
      meta: {
        title: '404',
        description: 'Page not found'
      }
    }
  ],
  linkActiveClass: 'active'
})

router.afterEach((to) => {
  useProvenanceStore().setPageTitle(to.meta.title)
  useProvenanceStore().setPageDescription(to.meta.description)
})

trackRouter(router)

export default router
