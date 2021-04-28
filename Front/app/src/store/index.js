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
    commentaires: [],
    depts: [],
    error: false,
    errorMsg: '',
    errorStatus: '',
    form: {
      backFct: null,
      submitPath: null
    },
    groupe: {},
    groupeList: [],
    headers: {},
    lastAnnonce: {},
    loading: true,
    participationInfos: {},
    profil: {},
    token: null,
  },
  mutations: {
    isLoading(state, payload) {
      state.loading = payload
    },
    triggError(state, payload) {
      state.error = payload.bool;
      state.errorMsg = payload.msg;
      state.errorStatus = payload.status;
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
      state.groupe = payload
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
    setError(context, payload) {
      context.commit('triggError', { bool: payload, msg: '' });
    },
    chooseSubmit(context, payload) {
      context.commit('setSubmit', payload)
    },
    sendForm(context, req) { // req = { backFct: ..., data: ...}
      return Back.request(req.backFct, req.data)
      .then(res => { if (res) context.commit('setProfil', res) }) // Pas de res pour la création de groupes/participations/commentaires, seul les formulaires "utilisateur" renvoient des données qui seront traitées par 'setProfil'
      .catch(error => {
        console.log(error);
        context.commit('triggError', { bool: true, status: error.status, msg: error.msg });
        context.commit('isLoading', false);
      })
    },
    GPMRequest(context, req) { // req = { backFct: ..., data: ...}
      context.commit('isLoading', true);
      return Back.request(req.backFct, req.data ? req.data : null)
      .then(res => {
        context.commit(req.backFct, res);
        context.commit('isLoading', false)
      })
      .catch(error => {
        console.log(error);
        context.commit('triggError', { bool: true, status: error.status, msg: error.msg });
        context.commit('isLoading', false);
      })
    },
  },
  getters: {

  }
})