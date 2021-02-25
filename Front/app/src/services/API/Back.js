export default {
  getDepts() {
    return fetch('http://localhost:3000/getDepts')
    .then(res =>  res.json())
    .then(res => res.depts)
    .catch((error) => {
      console.error('Error:', error);
    });
  },
  postForm(data) {
    return fetch('http://localhost:3000/user/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}