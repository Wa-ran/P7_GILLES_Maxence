import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blockSlideCount: 0
  },
  mutations: {
    blockSlideIncrement (state) {
      state.blockSlideCount++
    }
  },
  actions: {

  },
  getters: {

  }
})