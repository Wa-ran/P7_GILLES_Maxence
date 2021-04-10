const groupomania = require('./groupomania');
const gpm = require('../middlewares/gpm');
const bcrypt = require('bcrypt');

exports.createUser = async (req) => {
  await groupomania.connect
  .then(() => { 
    gpm.checkDept(req.departement)
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
  .then(async () => {
    return await bcrypt.compare(req.verifPass, profil.password)
  })
  .then((valid) => {
    if (!valid) {
      throw {custMsg : 'Mot de passe incorrect >:('}
    }
  })
  return profil
};

exports.modifUserInfos = async (req) => {
  let profil;

  await gpm.checkDept(req.departement)
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
};

exports.modifUserEmail = async (req) => {
  await this.selectProfil(req)
  .then(() => { // Enregistrement du mail
    return session.sql('CALL modif_user_email(\''+ req.newEmail +'\', \''+ req.email +'\');')
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
};

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
};