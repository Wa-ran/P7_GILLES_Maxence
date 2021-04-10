import store from '../../store/index';

export default {
  postSignup(data) {
    return fetch('http://localhost:3000/user/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  postLogin(data) {
    return fetch('http://localhost:3000/user/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json();
      }
    })
  },
  putInfos(data) {
    return fetch('http://localhost:3000/user/putInfos', {
      method: "PUT",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  putEmail(data) {
    return fetch('http://localhost:3000/user/putEmail', {
      method: "PUT",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  putPass(data) {
    return fetch('http://localhost:3000/user/putPass', {
      method: "PUT",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  getDeptsList() {
    return fetch('http://localhost:3000/gpm/depts')
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  getLastAnnonce() {
    return fetch('http://localhost:3000/gpm/lastAnnonce', { headers : store.state.headers })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  getGroupeList() {
    return fetch('http://localhost:3000/gpm/groupe', {
      method: "GET",
      headers: store.state.headers
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  getGroupeContent(groupe) {
    return fetch('http://localhost:3000/gpm/groupe/' + encodeURIComponent(groupe), {
      method: "GET",
      headers: store.state.headers
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
    .then((res) => {
      let list = {};
      list[groupe] = res;
      return list
    })
  },
  postGroupe(data) {
    return fetch('http://localhost:3000/gpm/groupe/create', {
      method: "POST",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
  postParticipation(data) {
    return fetch('http://localhost:3000/gpm/participation/create', {
      method: "POST",
      headers: store.state.headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        return res.json()
      }
    })
  },
}