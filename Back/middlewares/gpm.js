const groupomania = require('./groupomania');
const { encrypt, decrypt } = require('../middlewares/crypto');
const bcrypt = require('bcrypt');

exports.listDepts = async () => {
  let dept = [];

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT nom FROM departement').execute(function (row) {
      row.forEach(nom => {
        dept.push(nom)
      })
    })
  })
  .catch(() => {
    throw {custMsg : 'Problème lors de la récupération des départements.'}
  })
  return dept
}

exports.checkDept = async (departement) => {
  await this.listDepts()
  .then((depts) => { // Check de l'input departement
    let match = false;
    depts.forEach((dept) => {
      if (encrypt(dept) === encrypt(departement)) {
        match = true;
        return departement = dept;
      }
    });
    if (!match) {
      throw {custMsg : ' !! dept ne correspond pas !! '}
    }
  })
};

exports.selectProfil = async (req) => {
  let profil;

  await groupomania.connect
  .then(function () {
    return session.sql('CALL log_in(\''+ req.email +'\');')
    .execute(res => { return profil = res[0] })
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
  .then(() => {
    if (!bcrypt.compareSync(req.verifPass, profil.password)) {
      throw {custMsg : 'Mot de passe incorrect >:('}
    }
  })
  return profil
};

exports.createUser = async (req) => {
  await groupomania.connect
  .then(() => { 
    this.checkDept(req.departement)
  })
  .then(() => { // Enregistrement de l'utilisateur, check mail existant dans procédure
    return session.sql('CALL sign_up(\''+ req.nom +'\', \''+ req.prenom +'\', \''+ req.email +'\', \''+ req.password +'\', \''+ req.departement +'\');')
    .execute() // pas de renvoi sauf erreurs
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
};

exports.modifUserInfos = async (req) => {
  let profil;

  await this.checkDept(req.departement)
  .then(async () => {
    await this.selectProfil(req)
  })
  .then(() => { // Enregistrement des modifications
    return session.sql('CALL modif_user_infos(\''+ req.nom +'\', \''+ req.prenom +'\', \''+ req.email +'\', \''+ req.departement +'\');')
    .execute(res => { return profil = res[0] })
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
  return profil
}

exports.modifUserEmail = async (req) => {
  let profil;

  await this.selectProfil(req)
  .then(() => { // Enregistrement du mail
    return session.sql('CALL modif_user_email(\''+ req.newEmail +'\', \''+ req.email +'\');')
    .execute(res => { return profil = res[0] })
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
  return profil
}

exports.modifUserPass = async (req) => {
  await this.selectProfil(req)
  .then(() => { // Enregistrement du mot de passe
    return session.sql('CALL modif_user_pass(\''+ req.newPassword +'\', \''+ req.email +'\');')
    .execute() // Pas de renvoi sauf erreurs
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
}