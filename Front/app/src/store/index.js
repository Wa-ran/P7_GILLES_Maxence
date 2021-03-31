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
    setDepts(state, payload) {
      state.depts = payload.depts
    },
    lastAnnonce(state, payload) {
      state.lastAnnonce = payload
    },
    addGroupe(state, payload) {
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
    getDepts(context) {
      return Back.getDepts()
      .then(res => context.commit('setDepts', res))
    },
    getLastAnnonce(context) {
      return Back.getLastAnnonce()
      .then(res => context.commit('lastAnnonce', res))
    },
    getGroupeContent(context, groupe) {
      return Back.getGroupeContent(groupe)
      .then(res => context.commit('addGroupe', res))
    },
  },
  getters: {

  }
})