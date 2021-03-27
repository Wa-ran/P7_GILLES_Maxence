const gpm = require('../middlewares/gpm');

exports.lastAnnonce = (req, res, next) => {
  gpm.lastAnnonce()
  .then((annonce) => {
    res.send(annonce)
  })
};