const gpm = require('../middlewares/gpm');

exports.getDepts = (req, res, next) => {
  gpm.listDepts()
  .then((depts) => {
    res.json({ depts })
  })
};