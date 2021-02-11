export default {
  getUser() {
    return fetch('http://localhost:3000/login')
    .then(response => response.json())
  },
  postForm(data) {
    return fetch('http://localhost:3000/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}