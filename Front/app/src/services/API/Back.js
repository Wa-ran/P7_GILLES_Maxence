import store from '../../store/index';

export default {
  request(fct, data) {
    return this[fct](data ? data : '')
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else if (res) {
        return res.json();
      }
    })
  },
  asyncpostSignup(data) {
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