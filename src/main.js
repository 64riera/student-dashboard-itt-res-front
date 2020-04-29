
/* ------- Student ------- */

// Auth components
import LoginComponent from '@/components/student/auth/login.component.vue';
import RegisterComponent from '@/components/student/auth/register.component.vue';

// Dashboard views
import Dashboard from '@/views/student/Dashboard.vue';

/* ------- Admin ------- */

// Auth components
import AdminLoginComponent from '@/components/admin/auth/login.component.vue';

// Dashboard views
import AdminDashboard from '@/views/admin/Dashboard.vue';
import StudentDetails from '@/components/admin/student.details.component.vue';

import VueResource from 'vue-resource';
import Notifications from 'vue-notification';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

/* ------- Student ------- */

// Auth Components
Vue.component('login-component', LoginComponent);
Vue.component('register-component', RegisterComponent);

// Dashboard views
Vue.component('dashboard', Dashboard);

/* ------- Admin ------- */

// Auth Components
Vue.component('admin-login-component', AdminLoginComponent);

// Dashboard views
Vue.component('admin-dashboard', AdminDashboard);
Vue.component('student-details', StudentDetails);

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(Notifications);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
