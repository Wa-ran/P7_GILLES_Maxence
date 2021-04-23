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
    loading: true,
    form: {
      backFct: null,
      submitPath: null
    },
    profil: {},
    token: null,
    headers: {},
    depts: [],
    lastAnnonce: {},
    groupeList: [],
    groupe: {},
    participationInfos: {},
    commentaires: [],
  },
  mutations: {
    isLoading(state, payload) {
      state.loading = payload
    },
    setSubmit(state, payload) {
      state.form.backFct = payload.backFct;
      state.form.submitPath = payload.submitPath;
    },
    setProfil(state, payload) {
      if (payload) {
        for (const [key, value] of Object.entries(payload)) {
          if (key.match(/(token)/)) {
            state.token = value;
            state.headers = {
            'Authorization': state.token,
            'Content-Type': 'application/json'
            }
          } else {
            state.profil[key] = value
          }
        }        
      }
    },
    getDeptsList(state, payload) {
      state.depts = payload
    },
    getLastAnnonce(state, payload) {
      state.lastAnnonce = payload
    },
    getGroupeList(state, payload) {
      state.groupeList = payload
    },
    getGroupeContent(state, payload) {
      Vue.set(state.groupe , Object.keys(payload)[0], Object.values(payload)[0])
    },
    getParticipationInfos(state, payload) {
      for (const [key, value] of Object.entries(payload[0])) {
        state.participationInfos[key] = value
      }  
    },
    getParticipationComment(state, payload) {
      state.commentaires = payload  
    }
  },
  actions: {
    setLoading(context, payload) {
      context.commit('isLoading', payload)
    },
    chooseSubmit(context, payload) {
      context.commit('setSubmit', payload)
    },
    sendForm(context, req) {
      return Back[req.backFct](req.data)
      .then(res => context.commit('setProfil', res)) // Pas de res pour la création de groupes/participations/commentaires
    },
    GPMRequest(context, req) {
      context.commit('isLoading', true);
      return Back[req.backFct](req.data ? req.data : null)
      .then(res => {
        context.commit(req.backFct, res);
        if (res) context.commit('isLoading', false)
      })
    },
  },
  getters: {

  }
})