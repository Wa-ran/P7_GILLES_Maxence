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
    profile: {}
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    getProfile (context) {
      return Back.getProfile()
      .then(profile => context.commit('setProfile', profile))
    },
    postForm (context, data) {
      return Back.postForm(data)
      .then(res => context.commit('setProfile', res))
    }
  },
  getters: {

  }
})