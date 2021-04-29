import store from '../../store/index';

export default {
  request(fct, data) {
    return this[fct](data ? data : '')
    .then(async (res) => {
      if (res.status >= 400) {
        let err = {};
        let status = res.status;
        let msg = {};

        try {
          msg = await res.json() // Si le serveur ne renvoie qu'un statut sans corps, '.json' va fail
        } catch (error) {
          msg = res.statusText
        }

        err['status'] = status;
        err['msg'] = msg;

        throw err
      }
      else if (res) {
        try {
          res = await res.json();
          return res
        } catch (error) {
          return res // Le serveur renvois parfois un statut seul
        }
      }
    })
  },
  postSignup(data) {
    return fetch('http://localhost:3000/user/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  },
  postLogin(data) {
    return fetch('http://localhost:3000/user/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  },
  putInfos(data) {
    return fetch('http://localhost:3000/user/putInfos', {
      method: "PUT",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
  },
  putEmail(data) {
    return fetch('http://localhost:3000/user/putEmail', {
      method: "PUT",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
  },
  putPass(data) {
    return fetch('http://localhost:3000/user/putPass', {
      method: "PUT",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
  },
  postAvatar(data) {
    return fetch('http://localhost:3000/user/avatar', {
      method: "POST",
      headers: { 'Authorization': store.state.headers.Authorization },
      body: data
    })
  },
  getUsersList() {
    return fetch('http://localhost:3000/gpm/users', { headers : store.state.headers })
  },
  getDeptsList() {
    return fetch('http://localhost:3000/gpm/depts')
  },
  getLastAnnonce() {
    return fetch('http://localhost:3000/gpm/lastAnnonce', { headers : store.state.headers })
  },
  getGroupeList() {
    return fetch('http://localhost:3000/gpm/groupeList', {
      method: "GET",
      headers: store.state.headers
    })
  },
  getGroupeContent(groupe) {
    return fetch('http://localhost:3000/gpm/groupe/' + encodeURIComponent(groupe), {
      method: "GET",
      headers: store.state.headers
    })
  },
  postGroupe(data) {
    return fetch('http://localhost:3000/gpm/groupe/create', {
      method: "POST",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
  },
  getParticipationInfos(participationId) {
    return fetch('http://localhost:3000/gpm/participation/' + participationId, {
      method: "GET",
      headers: store.state.headers
    })
  },
  postParticipation(data) {
    return fetch('http://localhost:3000/gpm/participation/create', {
      method: "POST",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
  },
  getParticipationComment(participationId) {
    return fetch('http://localhost:3000/gpm/participation/' + participationId + '/commentaire', {
      method: "GET",
      headers: store.state.headers
    })
  },
  postCommentaire(data) {
    return fetch('http://localhost:3000/gpm/participation/' + data.idParticipation + '/commentaire', {
      method: "POST",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
  },
}