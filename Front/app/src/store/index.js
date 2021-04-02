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
    lastAnnonce: {},
    groupeList: [],
    groupe: {},
  },
  mutations: {
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
    deptsList(state, payload) {
      state.depts = payload
    },
    lastAnnonce(state, payload) {
      state.lastAnnonce = payload
    },
    groupeList(state, payload) {
      state.groupeList = payload
    },
    groupeContent(state, payload) {
      state.groupe = payload
    }
  },
  actions: {
    chooseSubmit(context, payload) {
      context.commit('setSubmit', payload)
    },
    sendForm(context, req) {
      return Back[req.backFct](req.data)
      .then(res => context.commit('setProfil', res))
    },
    GPMRequest(context, req) {
      return Back[req.backFct](req.data ? req.data : null)
      .then(res => context.commit(req.backFct, res))
    },
  },
  getters: {

  }
})