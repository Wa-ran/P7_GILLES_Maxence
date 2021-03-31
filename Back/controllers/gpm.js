const gpm = require('../middlewares/gpm');

exports.getDepts = (req, res, next) => {
  gpm.listDepts()
  .then((depts) => {
    res.json({ depts })
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg , err: "Erreur lors de la connexion."});
  })
};

exports.lastAnnonce = (req, res, next) => {
  gpm.lastAnnonce()
  .then((annonce) => {
    res.send(annonce)
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg , err: "Erreur lors de la connexion."});
  })
};

exports.getGroupeContent = (req, res, next) => {
  gpm.getGroupeContent(decodeURIComponent(req.params.groupe))
  .then((content) => {
    res.send(content)
  })
  .catch((error) => {
    console.log(error);
    let msg = error.custMsg;
    res.status(500).send({msg , err: "Erreur lors de la connexion."});
  })
};