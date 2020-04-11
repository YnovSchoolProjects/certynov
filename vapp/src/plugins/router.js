import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'my-link-active-class',
  routes: [
    {
      path: '/missing-extension',
      name: 'missing-extension',
      component: () => import('../views/errors/MissingExtension.vue'),
      meta: {
        requireWallet: false,
        requireRole: [],
      }
    },
    {
      path: '/missing-configuration',
      name: 'missing-configuration',
      component: () => import('../views/errors/MissingConfiguration.vue'),
      meta: {
        requireWallet: false,
        requireRole: [],
      }
    },
    {
      path: '/',
      name: 'authenticate',
      component: () => import('../views/Authenticate.vue'),
      meta: {
        requireWallet: false,
        requireRole: [],
      }
    },
    {
      path: '/issuers',
      name: 'issuers',
      component: () => import('../views/Issuers.vue'),
      meta: {
        requireWallet: true,
        requireRole: 'owner',
      }
    },
    {
      path: '/certify',
      name: 'certify',
      component: () => import('../views/Certify.vue'),
      meta: {
        requireWallet: true,
        requireRole: 'issuer',
      }
    },
    {
      path: '*',
      redirect: { name: 'authenticate' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('eth/initStore');

  if (to.matched.some(record => record.meta.requireWallet) && store.getters['eth/hasAccount']) {
    const ownedRoles = store.getters['eth/certs/getOwnedRoles'];

    if (to.matched.some(record => record.meta.requireRole !== []) && to.matched.some(record => ownedRoles.includes(record.meta.requireRole))) {
      next();
    } else {
      next({ name: 'authenticate'});
    }
  } else {
    next();
  }
});


export default router;
