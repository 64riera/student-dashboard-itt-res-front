import Vue from 'vue';
import Vuex from 'vuex';

const API_HOST = 'http://localhost:4000/api/';

const usersModule = {
  namespaced: true,
  state: {
    users: null,
    user: null,
    isLogged: false,
  },
  mutations: {
    setLoginUser(state, payload) {
      localStorage.setItem('currentToken', JSON.stringify(payload));
      localStorage.setItem('isLogged', 'true');
      state.user = payload;
      state.isLogged = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem('currentToken');
      localStorage.removeItem('isLogged');
    },
    setUserData(state, payload) {
      if (!payload) return false;
      state.user = payload;
      return true;
    },
  },
  actions: {
    async saveNewUser({ commit }, payload) {
      Vue.http.options.root = API_HOST;
      await Vue.http.post('register', payload)
        .then((response) => {
          console.log(commit, response);
        }, (error) => {
          console.log(error);
        });
    },
    async loginUser({ commit }, payload) {
      Vue.http.options.root = API_HOST;
      await Vue.http.post('login', payload)
        .then((response) => {
          commit('setLoginUser', response.body);
        }, (err) => {
          console.log(err);
        });
    },
    async getUserData({ commit }, payload) {
      Vue.http.options.root = API_HOST;
      await Vue.http.post('user', { controlNum: payload })
        .then((response) => {
          commit('setUserData', response.body);
        }, (err) => {
          console.log(err, commit);
        });
    },
    async saveResidenceRequest({ commit }, payload) {
      const userData = JSON.parse(localStorage.getItem('currentToken'));
      Vue.http.options.root = API_HOST;
      Vue.http.headers.common['auth-token'] = userData.accessToken;
      await Vue.http.post('residence-application', payload)
        .then((response) => {
          console.log(response);
        }, (err) => {
          console.log(err, commit, payload);
        });
    },
    logout({ commit }) {
      commit('clearUser');
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
