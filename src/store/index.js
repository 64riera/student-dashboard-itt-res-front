import Vue from 'vue';
import Vuex from 'vuex';

const API_HOST = process.env.VUE_APP_API_HOST;
const DROPBOX_API_KEY = process.env.VUE_APP_DROPBOX_API_KEY;
const DROPBOX_API_URL = process.env.VUE_APP_DROPBOX_API_URL;
const DROPBOX_API_DOWNLOAD_FILE_URL = process.env.VUE_APP_DROPBOX_API_FILE_DOWNLOAD_URL;
const DROPBOX_API_TEMP_LINK_URL = process.env.VUE_APP_DROPBOX_TEMP_LINK_FILE_URL;

const usersModule = {
  namespaced: true,
  state: {
    users: null,
    user: null,
    isLogged: false,
    disabledAndLoading: false,
    studentsData: null,
    loadingStudentsData: false,
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
      state.user = payload;
      return true;
    },
    setDisabledAndLoading(state, payload) {
      state.disabledAndLoading = payload;
    },
    setLoadingStudentsData(state, payload) {
      state.loadingStudentsData = payload;
    },
    setStudentsData(state, payload) {
      state.studentsData = payload;
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
      const userData = JSON.parse(localStorage.getItem('currentToken'));
      commit('setUserData', null);
      Vue.http.options.root = API_HOST;
      Vue.http.headers.common['auth-token'] = userData.accessToken;
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
    // eslint-disable-next-line no-unused-vars
    async uploadFileStep({ commit }, payload) {
      if (!payload) return false;

      commit('setDisabledAndLoading', true);

      const userData = JSON.parse(localStorage.getItem('currentToken'));
      Vue.http.options.root = API_HOST;
      Vue.http.headers.common['auth-token'] = userData.accessToken;
      await Vue.http.post('file-upload', payload)
        .then(() => {
          Vue.notify({
            group: 'foo',
            title: 'Solicitud completada',
            text: 'Los datos se han enviado correctamente',
            duration: 4500,
            type: 'success',
          });
        })
        .catch(() => {
          Vue.notify({
            group: 'foo',
            title: 'Solicitud incompleta',
            text: 'Verifica tu conexión y si el archivo es de tipo doc, docx o pdf',
            duration: 4500,
            type: 'error',
          });
          commit('setDisabledAndLoading', false);
          return false;
        });

      await fetch(DROPBOX_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DROPBOX_API_KEY}`,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': `{"path":"/ResidenceStudentsFiles/${payload.fileName}"}`,
        },
        body: payload.file,
      })
        .then((response) => {
          if (response.ok) {
            Vue.notify({
              group: 'foo',
              title: 'Documento procesado',
              text: 'Se ha recibido su documento',
              duration: 4500,
              type: 'success',
            });
            // eslint-disable-next-line no-restricted-globals
            return location.reload();
          }
          Vue.notify({
            group: 'foo',
            title: 'Documento no procesado',
            text: 'Reintente por favor',
            duration: 4500,
            type: 'error',
          });

          return response.ok;
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => false);

      commit('setDisabledAndLoading', false);

      return true;
    },
    logout({ commit }) {
      commit('clearUser');
    },
    async getStudentsData({ commit }) {
      commit('setLoadingStudentsData', true);

      const userData = JSON.parse(localStorage.getItem('currentToken'));
      Vue.http.options.root = API_HOST;
      Vue.http.headers.common['auth-token'] = userData.accessToken;
      await Vue.http.get('get')
        .then((data) => {
          commit('setStudentsData', data.body.users);
        })
        .catch()
        .then(() => {
          commit('setLoadingStudentsData', false);
        });
    },
    // eslint-disable-next-line no-unused-vars
    async downloadStudentFile({ commit }, payload) {
      await fetch(DROPBOX_API_DOWNLOAD_FILE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DROPBOX_API_KEY}`,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': `{"path":"${payload}"}`,
        },
      })
        .then((res) => res)
        .then((data) => console.log(data));
    },
    // eslint-disable-next-line no-unused-vars
    async getTemporalFileLink({ commit }, payload) {
      await fetch(DROPBOX_API_TEMP_LINK_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DROPBOX_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body:
          `{"path":"${payload}"}`,
      })
        .then((res) => res.json())
        .then((data) => {
          window.open(data.link);
        });
    },
  },
};

const UI = {
  namespaced: true,
  state: {
    primaryColor: 'green accent-4',
    secondaryColor: 'green darken-1',
    primaryColorAdmin: 'light-blue',
    secondaryColorAdmin: 'light-blue darken-1',
    adminDrawer: false,
  },
  mutations: {
    mutateDrawerState(state, payload) {
      state.adminDrawer = payload;
    },
  },
  actions: {
    changeDrawer({ commit }, payload) {
      commit('mutateDrawerState', payload);
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
    UI,
  },
});
