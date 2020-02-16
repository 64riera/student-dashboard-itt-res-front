import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/auth/login.component.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/auth/register.component.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
