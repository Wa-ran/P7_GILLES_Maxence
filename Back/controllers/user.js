const jwt = require('jsonwebtoken');

const user = require('../middlewares/user');
const { decrypt } = require('../middlewares/crypto');
const { cryptData } = require('../middlewares/sanitizer')

exports.standardizeProfil = (data) => {
  let profil = {};
  try {
    profil.email = decrypt(data.email);
    profil.nom = decrypt(data.nom);
    profil.prenom = decrypt(data.prenom);
    profil.departement = data.departement;
    return profil
  } catch (error) {
    throw {custMsg: "Problème serveur : Le format n'est pas accepté."}
  }
};

exports.signup = async (req, res, next) => {
  let profil = {};
  profil.email = req.body.email;
  
  await cryptData(req.body)
  .then(async (cryptData) => {
    await user.createUser(cryptData)
  })
  .then(() => {
    res.status(201).send(profil)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.login = async (req, res, next) => {
  let tokenId = req.body.email;

  await cryptData(req.body)
  .then(async (cryptData) => {
    return await user.selectProfil(cryptData)
  })
  .then((profil) => {
    profil = this.standardizeProfil(profil);
    profil.token = jwt.sign(
      { tokenId },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' }
    )
    res.send(profil)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.modifUserInfos = async (req, res, next) => {
  await cryptData(req.body)
  .then(async (cryptData) => {
    return await user.modifUserInfos(cryptData)
  })
  .then((profil) => {
    profil = this.standardizeProfil(profil);
    res.status(201).send(profil)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.modifUserEmail = async (req, res, next) => {
  await cryptData(req.body)
  .then(async (cryptData) => {
    return await user.modifUserEmail(cryptData)
  })
  .then(() => {
    res.status(201).json("Email modifié avec succès !")
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.modifUserPass = async (req, res, next) => {
  await cryptData(req.body)
  .then(async (cryptData) => {
    return await user.modifUserPass(cryptData)
  })  
  .then(() => {
    res.status(201).json("Mot de passe modifié avec succès !")
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};