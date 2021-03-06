const groupomania = require('./groupomania');

exports.getDepts = groupomania.db
.then(function () {
  let dept = [];
  return Promise.all([
    session.sql('SELECT nom FROM departement').execute(function (row) {
      row.forEach(nom => {
        dept.push(nom)
      })
    })
  ])
  .then(() => { return dept })
})
.catch((error) => {
  console.error(error);
});