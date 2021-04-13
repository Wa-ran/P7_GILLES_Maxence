const jwt = require('jsonwebtoken');
const user = require('../middlewares/user');
const { cryptData, decryptData } = require('../middlewares/sanitizer')

exports.signup = (req, res, next) => {
  let profil = {};
  profil.email = req.body.email;
  
  cryptData(req.body)
  .then((cryptData) => {
    return user.createUser(cryptData)
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.login = (req, res, next) => {
  cryptData(req.body)
  .then((cryptData) => {
    return user.selectProfil(cryptData)
  })
  .then(async (profil) => {
    profil = await decryptData(profil);
    delete profil.password;

    let tokenId = profil.id;
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

exports.putInfos = (req, res, next) => {
  cryptData(req.body)
  .then((cryptData) => {
    return user.putInfos(cryptData)
  })
  .then(async (profil) => {
    profil = await decryptData(profil);
    res.status(200).send(profil)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.putEmail = (req, res, next) => {
  cryptData(req.body)
  .then((cryptData) => {
    return user.putEmail(cryptData)
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.putPass = (req, res, next) => {
  cryptData(req.body)
  .then((cryptData) => {
    return user.putPass(cryptData)
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};