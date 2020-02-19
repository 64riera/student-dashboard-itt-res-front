import Vue from 'vue';
import Vuex from 'vuex';

const API_HOST = 'https://residencias-itt.herokuapp.com/api/';

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
    // eslint-disable-next-line no-unused-vars
    async saveNewUser({ commit }, payload) {
      Vue.http.options.root = API_HOST;
      await Vue.http.post('register', payload)
        .then((response) => response, (error) => error);
    },
    async loginUser({ commit }, payload) {
      Vue.http.options.root = API_HOST;
      await Vue.http.post('login', payload)
        .then((response) => {
          commit('setLoginUser', response.body);
        }, (err) => err);
    },
    async getUserData({ commit }, payload) {
      Vue.http.options.root = API_HOST;
      await Vue.http.post('user', { controlNum: payload })
        .then((response) => {
          commit('setUserData', response.body);
        }, (err) => err);
    },
    // eslint-disable-next-line no-unused-vars
    async saveResidenceRequest({ commit }, payload) {
      const userData = JSON.parse(localStorage.getItem('currentToken'));
      Vue.http.options.root = API_HOST;
      Vue.http.headers.common['auth-token'] = userData.accessToken;
      await Vue.http.post('residence-application', payload)
        .then((response) => {
          Vue.notify({
            group: 'foo',
            title: 'Solicitud enviada',
            text: 'Los datos se han enviado correctamente',
            duration: 4500,
            type: 'success',
          });
          return response;
        }, (err) => err);
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
