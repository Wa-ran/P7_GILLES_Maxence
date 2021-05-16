import store from '../../store/index';

export default {
  request(fct, data) {
    let headers;
    if (data && typeof data === 'object' && !(data instanceof FormData)) { // data = object to send
      data = JSON.stringify(data);
      headers = store.state.headers;
    }
    else { // Si rien a envoyer, OU si FormData (on laisse le browser gérer le content-type)
      headers = { 'Authorization': store.state.headers.Authorization }
    }

    return this[fct](data ? data : '', headers)
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
      body: data
    })
  },
  postLogin(data) {
    return fetch('http://localhost:3000/user/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data
    })
  },
  putInfos(data, headers) {
    return fetch('http://localhost:3000/user/putInfos', {
      method: "PUT",
      headers,
      body: data
    })
  },
  putEmail(data, headers) {
    return fetch('http://localhost:3000/user/putEmail', {
      method: "PUT",
      headers,
      body: data
    })
  },
  putPass(data, headers) {
    return fetch('http://localhost:3000/user/putPass', {
      method: "PUT",
      headers,
      body: data
    })
  },
  postAvatar(data, headers) {
    return fetch('http://localhost:3000/user/avatar', {
      method: "POST",
      headers,
      body: data
    })
  },
  deleteUser(data, headers) {
    return fetch('http://localhost:3000/user/delete', {
      method: "DELETE",
      headers,
      body: data
    })
  },
  getUsersList() {
    return fetch('http://localhost:3000/gpm/users', { headers : store.state.headers })
  },
  getDeptsList() {
    return fetch('http://localhost:3000/gpm/depts')
  },
  getLastArticles() {
    return fetch('http://localhost:3000/gpm/lastArticles', { headers : store.state.headers })
  },
  getGroupeList() {
    return fetch('http://localhost:3000/gpm/groupeList', {
      method: "GET",
      headers: store.state.headers
    })
  },
  getGroupeContent(groupeName, headers) {
    return fetch('http://localhost:3000/gpm/groupe/' + encodeURIComponent(groupeName), {
      method: "GET",
      headers
    })
  },
  getGroupeMember(groupeName, headers) {
    return fetch('http://localhost:3000/gpm/groupe/' + encodeURIComponent(groupeName) + '/member', {
      method: "GET",
      headers
    })
  },
  getGroupeCommSignaled(groupeName, headers) {
    return fetch('http://localhost:3000/gpm/groupe/' + encodeURIComponent(groupeName) + '/commSignaled', {
      method: "GET",
      headers
    })
  },
  postGroupe(data, headers) {
    return fetch('http://localhost:3000/gpm/groupe/create', {
      method: "POST",
      headers,
      body: data
    })
  },
  getParticipationInfos(idParticipation, headers) {
    return fetch('http://localhost:3000/gpm/participation/' + idParticipation.toString(), {
      method: "GET",
      headers
    })
  },
  postParticipation(data, headers) {
    return fetch('http://localhost:3000/gpm/participation/create', {
      method: "POST",
      headers,
      body: data
    })
  },
  getParticipationComment(idParticipation, headers) {
    return fetch('http://localhost:3000/gpm/participation/' + idParticipation.toString() + '/commentaire', {
      method: "GET",
      headers
    })
  },
  postCommentaire(data, headers) {
    let idParticipation = (data instanceof FormData) ? data.get('idParticipation') : JSON.parse(data).idParticipation;

    return fetch('http://localhost:3000/gpm/participation/' + idParticipation.toString() + '/commentaire', {
      method: "POST",
      headers,
      body: data
    })
  },
  deleteCommentaire(data, headers) {
    let idParticipation = JSON.parse(data).idParticipation;

    return fetch('http://localhost:3000/gpm/participation/' + idParticipation.toString() + '/commentaire', {
      method: "DELETE",
      headers,
      body: data
    })
  },
  putSignalComment(data, headers) {
    return fetch('http://localhost:3000/gpm/commentaire/signal', {
      method: "PUT",
      headers,
      body: data
    })
  },
}