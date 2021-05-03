const jwt = require('jsonwebtoken');
const fs = require('fs');
const user = require('../middlewares/user');
const { cryptData, decryptData } = require('../middlewares/sanitizer');
const sharp = require('sharp');

exports.signup = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return user.createUser(data)
  })
  .then(() => res.sendStatus(201))
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
  .then(() => res.sendStatus(204))
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
  .then(() => res.sendStatus(204))
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.avatar = (req, res, next) => {
  if (!req.file) throw { custMsg : "Pas d'image selectionnée." }

  let path = req.file.path;
  let newPath = 'images/avatars/' + req.body.id + '_avatar.webp';
  let miniPath = 'images/avatars/' + req.body.id + '_avatar_mini.webp';

  try {
    fs.unlink(newPath);
    fs.unlink(miniPath);
  } catch (error) {};

  cryptData(req)
  .then((data) => {
    return user.selectProfil(data)
  })
  .then(() => {
    return sharp(path)
    .resize(200, 200)
    .toFile(newPath);
  })
  .then(() => {
    return sharp(path)
    .resize(40, 40)
    .toFile(miniPath);    
  })
  .then(() => {
    return fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
        throw { custMsg : "Problème lors de l'enregistrement de votre avatar." }
      }
    })
  })
  .then(() => res.sendStatus(201))
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};