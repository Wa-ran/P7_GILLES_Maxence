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
    avatar: {
      big: '',
      mini: ''
    },
    commentaires: [],
    depts: [],
    error: {
      pending: false,
      msg: '',
      status: ''
    },
    form: {
      backFct: null,
      submitPath: null
    },
    groupe: {},
    groupeList: [],
    groupeMember: [],
    groupeCommSignaled: [],
    headers: {},
    lastArticles: [],
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
      if (payload.status !== 404) {
        state.error.pending = payload.bool;
        state.error.msg = payload.msg ? payload.msg : '';
        state.error.status = payload.status ? payload.status : '';      
      }
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
        state.avatar.big = 'http://localhost:3000/images/avatars/' + state.profil.id + '_avatar.webp' + '?rand=' + Date.now();
        state.avatar.mini = 'http://localhost:3000/images/avatars/' + state.profil.id + '_avatar_mini.webp' + '?rand=' + Date.now();
        // rand sert à reload l'image si changement
      }
    },
    getDeptsList(state, payload) {
      state.depts = payload
    },
    getLastArticles(state, payload) {
      state.lastArticles = payload
    },
    getGroupeList(state, payload) {
      state.groupeList = payload
    },
    getGroupeMember(state, payload) {
      state.groupeMember = payload ? payload : []
    },
    getGroupeCommSignaled(state, payload) {
      state.groupeCommSignaled = payload ? payload : []
    },
    getGroupeContent(state, payload) {
      state.groupe = payload ? payload : {}
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
      context.commit('triggError', { bool: payload });
    },
    chooseSubmit(context, payload) {
      context.commit('setSubmit', payload)
    },
    sendForm(context, req) { // req = { backFct: ..., data: ...}
      return Back.request(req.backFct, req.data)
      .then(res => { 
        if (req.gpm) context.commit('setSubmit', { submitPath: res }) // Renvoi de GroupeName / participationId
        else context.commit('setProfil', res) // Renvoi du profil
      })
      .catch(error => {
        if (error.status !== 404) console.log(error);
        context.commit('triggError', { bool: true, status: error.status, msg: error.msg });
        context.commit('isLoading', false);
        throw error
      })
    },
    GPMRequest(context, req) { // req = { backFct: ..., data: ...}
      if (!this.state.error.pending) {
        context.commit('isLoading', true);
        return Back.request(req.backFct, req.data ? req.data : null)
        .then(res => {
          context.commit(req.backFct, res);
          context.commit('isLoading', false)
        })
        .catch(error => {
          if (error.status !== 404) console.log(error);
          context.commit('triggError', { bool: true, status: error.status, msg: error.msg });
          context.commit('isLoading', false);
          throw error
        })
      }
    }
  },
  getters: {

  }
})