const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const gpm = require('../middlewares/gpm');
const { encrypt, decrypt } = require('../middlewares/crypto');

exports.cryptData = async (data) => {
  let cryptData = {};
  try {
    for (const [key, value] of Object.entries(data)) {
      if (key.match(/(departement)/)) {
        cryptData[key] = value
      }
      else if (key.match(/(assword)/)) {
        cryptData[key] = await bcrypt.hash(value, 10)
      }
      else {
        cryptData[key] = encrypt(value)
      }
    }
    cryptData.verifPass = data.password ? data.password : data.passwordOrigin;
    return cryptData
  } catch (error) {
    throw {custMsg: "Le format des données n'est pas accepté."}
  }
};

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
  await this.cryptData(req.body)
  .then(async (cryptData) => {
    await gpm.createUser(cryptData)
  })
  .then(() => {
    let profil = {};
    profil.email = req.body.email;
    res.status(201).send(profil)
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg , err: "Erreur lors de l'inscription."})
  })
};

exports.login = async (req, res, next) => {
  let tokenId = req.email;

  await this.cryptData(req.body)
  .then(async (cryptData) => {
    return await gpm.selectProfil(cryptData)
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
    let msg = error.custMsg;
    res.status(500).send({msg , err: "Erreur lors de la connexion."});
  })
};

exports.modifUserInfos = async (req, res, next) => {
  await this.cryptData(req.body)
  .then(async (cryptData) => {
    return await gpm.modifUserInfos(cryptData)
  })
  .then((profil) => {
    profil = this.standardizeProfil(profil);
    res.status(201).send(profil)
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg , err: "Erreur, vos informations n'ont pas pu être modifiées."})
  })
};

exports.modifUserEmail = async (req, res, next) => {
  await this.cryptData(req.body)
  .then(async (cryptData) => {
    return await gpm.modifUserEmail(cryptData)
  })
  .then((profil) => {
    profil = this.standardizeProfil(profil);
    res.status(201).send(profil)
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg; 
    res.status(500).send({msg , err: "Erreur, votre email n'a pas pu être modifié."})
  })
};

exports.modifUserPass = async (req, res, next) => {
  await this.cryptData(req.body)
  .then(async (cryptData) => {
    return await gpm.modifUserPass(cryptData)
  })  
  .then(() => {
    res.status(201).json("Mot de passe modifié avec succès !")
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg , err: "Erreur, votre mot de passe n'a pas pu être modifié."})
  })
};