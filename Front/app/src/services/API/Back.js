export default {
  getDepts() {
    return fetch('http://localhost:3000/depts')
    .then(res => res.json())
    .then(res => res.depts)
    .catch((error) => {
      console.error( error );
    });
  },
  postForm(data) {
    return fetch('http://localhost:3000/user/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status >= 400) {
        throw res.json()
      } else {
        res.json()
      }
    })
  }
}