const gpm = require('../middlewares/gpm');

exports.getDepts = (req, res, next) => {
  gpm.getDepts
  .then((depts) => {
    res.json({
      depts
    })
  })
};