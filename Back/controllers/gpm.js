const gpm = require('../middlewares/gpm');
const { cryptGPM, decryptGPM } = require('../middlewares/sanitizer')

exports.getDeptsList = (req, res, next) => {
  gpm.getDeptsList()
  .then((depts) => {
    res.send(depts)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.getLastAnnonce = (req, res, next) => {
  gpm.getLastAnnonce()
  .then(async (annonce) => {
    let decrypt = await decryptGPM(annonce);
    res.send(decrypt)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.getGroupeList = (req, res, next) => {
  gpm.getGroupeList()
  .then(async (list) => {
    let readable = [];
    list.forEach(async groupe => {
      let decrypt = await decryptGPM(groupe);
      readable.push(decrypt)
    });
    return readable
  })
  .then((list) => {
    res.send(list)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.getGroupeContent = async (req, res, next) => {
  req.body.groupe = decodeURIComponent(req.params.groupe);

  await cryptGPM(req.body)
  .then((sane) => {
    return gpm.getGroupeContent(sane.groupe)
  })
  .then(async (groupe) => {
    let readable = [];
    groupe.forEach(async part => {
      let decrypt = await decryptGPM(part);
      readable.push(decrypt)
    });
    return readable
  })
  .then((list) => {
    res.send(list)
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.postGroupe = async (req, res, next) => {
  await cryptGPM(req.body)
  .then((groupe) => {
    gpm.postGroupe(groupe)
  })
  .then(() => {
    res.status(201)
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg})
  })
};

exports.postParticipation = async (req, res, next) => {
  await cryptGPM(req.body)
  .then((data) => {
    gpm.postParticipation(data)
  })
  .then(() => {
    res.status(201)
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg})
  })
};