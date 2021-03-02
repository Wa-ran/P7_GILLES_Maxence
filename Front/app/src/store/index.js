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
    profil: {},
    depts: [],
  },
  mutations: {
    setProfile(state, payload) {
      state.profil = payload;
    },
    setDepts(state, payload) {
      state.depts = payload;
    }
  },
  actions: {
    getDepts (context) {
      return Back.getDepts()
      .then(res => context.commit('setDepts', res))
    },
    postSignUp (context, data) {
      return Back.postForm(data)
      .then(res => context.commit('setProfile', res))
    }
  },
  getters: {

  }
})