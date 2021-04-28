const jwt = require('jsonwebtoken');
const fs = require('fs');
const user = require('../middlewares/user');
const { cryptData, decryptData } = require('../middlewares/sanitizer')

exports.signup = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return user.createUser(data)
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
  cryptData(req)
  .then((data) => {
    return user.selectProfil(data)
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
  cryptData(req)
  .then((data) => {
    return user.putInfos(data)
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
  cryptData(req)
  .then((data) => {
    return user.putEmail(data)
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
  cryptData(req)
  .then((data) => {
    return user.putPass(data)
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.avatar = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return user.selectProfil(data)
  })
  .then(() => {
    let path = req.file.path;
    var ext = path.substring(path.lastIndexOf('.') + 1);
    fs.rename(path, 'images/avatars/' + req.body.id + '_avatar.' + ext, () => {
      res.sendStatus(201)
    });
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};