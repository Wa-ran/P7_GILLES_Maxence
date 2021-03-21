import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'; // permet la sauvegarde du store au refresh

Vue.use(Vuex);

import Back from '@/services/API/Back.js';

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ],
  state: {
    form: {
      backFct: null,
      submitPath: null
    },
    profil: {},
    token: null,
    depts: [],
  },
  mutations: {
    clearProfil(state) {
      state.profil = {}
    },
    setSubmit(state, payload) {
      state.form.backFct = payload.backFct;
      state.form.submitPath = payload.submitPath;
    },
    setProfil(state, payload) {
      state.profil = {};
      for (const [key, value] of Object.entries(payload)) {
        if (key.match(/(token)/)) {
          state.token = value
        } else {
          state.profil[key] = value
        }
      }
    },
    setDepts(state, payload) {
      state.depts = payload;
    }
  },
  actions: {
    clearProfil(context) {
      context.commit('clearProfil')
    },
    chooseSubmit(context, payload) {
      context.commit('setSubmit', payload)
    },
    getDepts(context) {
      return Back.getDepts()
      .then(res => context.commit('setDepts', res))
    },
    sendForm(context, req) {
      return Back[req.backFct](req.data)
      .then(res => context.commit('setProfil', res))
    }
  },
  getters: {

  }
})