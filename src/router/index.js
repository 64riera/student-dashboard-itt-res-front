import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth/login.component.vue'),
    meta: {
      noRequiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/auth/register.component.vue'),
    meta: {
      noRequiresAuth: true,
    },
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/residence/request',
    name: 'Residence Request',
    component: () => import('@/components/step-1/pages/residence-request.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('isLogged') === 'true') {
      next();
    } else {
      router.push({ name: 'Login' });
    }
  }
  if (to.meta.noRequiresAuth) {
    if (localStorage.getItem('isLogged') === 'true') {
      router.push({ name: 'Dashboard' });
    } else {
      next();
    }
  }
});

export default router;
