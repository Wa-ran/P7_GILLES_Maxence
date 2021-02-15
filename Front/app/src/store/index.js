import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Back from '@/services/API/Back.js';

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    getUser (context) {
      return Back.getUser()
      .then(user => context.commit('setUser', user))
    },
    postForm (context, data) {
      return Back.postForm(data)
      .then(res => context.commit('setUser', res))
    }
  },
  getters: {

  }
})