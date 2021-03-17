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
    submitFct: null,
    profil: [],
    depts: [],
  },
  mutations: {
    setSubmit(state, fctName) {
      state.submitFct = fctName
    },
    setProfil(state, payload) {
      state.profil = payload;
    },
    setDepts(state, payload) {
      state.depts = payload;
    }
  },
  actions: {
    chooseSubmit(context, fctName) {
      context.commit('setSubmit', fctName)
    },
    getDepts (context) {
      return Back.getDepts()
      .then(res => context.commit('setDepts', res))
    },
    postSignUp (context, data) {
      return Back.signUp(data)
      .then(res =>{ context.commit('setProfil', res)})
    },
    getLogIn (context, data) {
      return Back.logIn(data)
      .then(res =>{ context.commit('setProfil', res)})
    }
  },
  getters: {

  }
})