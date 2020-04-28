
// Auth components
import LoginComponent from '@/components/student/auth/login.component.vue';
import RegisterComponent from '@/components/student/auth/register.component.vue';

// Dashboard views
import Dashboard from '@/views/student/Dashboard.vue';

import VueResource from 'vue-resource';
import Notifications from 'vue-notification';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// Auth Components
Vue.component('login-component', LoginComponent);
Vue.component('register-component', RegisterComponent);

// Dashboard views
Vue.component('dashboard', Dashboard);

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(Notifications);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
