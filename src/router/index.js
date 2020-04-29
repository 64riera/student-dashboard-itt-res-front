import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // Student routes
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/student/auth/login.component.vue'),
    meta: {
      noRequiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/student/auth/register.component.vue'),
    meta: {
      noRequiresAuth: true,
    },
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: () => import('@/views/student/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/residence/request',
    name: 'Residence Request',
    component: () => import('@/components/student/step-1/pages/residence-request.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  // Admin routes
  {
    path: '/admin/',
    redirect: '/admin/login',
  },
  {
    path: '/admin/login',
    name: 'Admin login',
    component: () => import('@/components/admin/auth/login.component.vue'),
    meta: {
      noRequiresAuth: true,
    },
  },
  {
    path: '/admin/dashboard',
    name: 'Admin dashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    meta: {
      requiresAdminAuth: true,
    },
  },
  {
    path: '/admin/details/:controlNum',
    name: 'Student details',
    component: () => import('@/components/admin/student.details.component.vue'),
    meta: {
      requiresAdminAuth: true,
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
  if (to.meta.requiresAdminAuth) {
    if (localStorage.getItem('isLogged') === 'true') {
      next();
    } else {
      router.push({ name: 'Admin login' });
    }
  }
  if (to.meta.noRequiresAdminAuth) {
    if (localStorage.getItem('isLogged') === 'true') {
      router.push({ name: 'Admin dashboard' });
    } else {
      next();
    }
  }
});

export default router;
