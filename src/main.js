
// Components
import LoginComponent from '@/components/auth/login.component.vue';
import RegisterComponent from '@/components/auth/register.component.vue';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// Auth Components
Vue.component('login-component', LoginComponent);
Vue.component('register-component', RegisterComponent);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
