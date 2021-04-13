const groupomania = require('./groupomania');
const gpm = require('../middlewares/gpm');
const bcrypt = require('bcrypt');

exports.createUser = (req) => {
  return gpm.checkDept(req.departement)
  .then(() => {
    return groupomania.call('sign_up', req.nom, req.prenom, req.email, req.password, req.departement)
  })
};

exports.selectProfil = async (req) => {
  let profil;

  await groupomania.call('log_in', req.email)
  .then((res) => {
    return profil = res[0]
  })
  .then(() => {
    return bcrypt.compare(req.verifPass, profil.password)
  })
  .then((valid) => {
    if (!valid) {
      throw { custMsg : 'Mot de passe incorrect >:(' }
    }
  })
  return profil
};

exports.putInfos = async (req) => {
  let profil;

  await gpm.checkDept(req.departement)
  .then(() => {
    return this.selectProfil(req)
  })
  .then(() => {
    return groupomania.call('modif_user_infos', req.nom, req.prenom, req.departement, req.id)
    .then(res => {
      return profil = res[0]
    })
  })
  return profil
};

exports.putEmail = (req) => {
  return this.selectProfil(req)
  .then(() => {
    return groupomania.call('modif_user_email', req.emailNew, req.id)
  })
};

exports.putPass = (req) => {
  return this.selectProfil(req)
  .then(() => {
    return groupomania.call('modif_user_pass', req.passwordNew, req.id)
  })
};