const groupomania = require('./groupomania');

exports.getDepts = groupomania.connect
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
  console.error('getDepts : ' + error);
});

exports.getProfil = (email) => {
  groupomania.connect
  .then(function (email) {
    let profil = [];
    return Promise.all([
      session.sql('SELECT * FROM utilisateur WHERE mail = \''+ email +'\';').execute(function (row) {
        row.forEach(field => {
          profil.push(field)
        })
      })
    ])
    .then(() => { return profil })
  })
  .catch((error) => {
    console.error('getProfil : ' + error);
  })
};

exports.createUser = async (nom, prenom, email, password, departement) => {
  await groupomania.connect
  .then(() => { // Enregistrement de l'utilisateur, check du mail dans procédure
    return session.sql('CALL sign_up(\''+ nom +'\', \''+ prenom +'\', \''+ email +'\', \''+ password +'\', \''+ departement +'\');')
    .execute()
    .catch((error) => {
      throw error.info.msg
    })
  })
}