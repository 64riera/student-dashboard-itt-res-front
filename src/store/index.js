import Vue from 'vue';
import Vuex from 'vuex';

const API_HOST = 'http://localhost:4000/api/';

const usersModule = {
  namespaced: true,
  state: {
    users: null,
    user: null,
  },
  mutations: {

  },
  actions: {
    saveNewUser({ commit }, payload) {
      Vue.http.options.root = API_HOST;
      Vue.http.post('register', payload)
        .then((response) => {
          console.log(commit, response);
        }, (error) => {
          console.log(error);
        });
    },
  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    usersModule,
  },
});
