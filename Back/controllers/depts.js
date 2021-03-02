const depts = require('../middlewares/depts');

exports.get = (req, res, next) => {
  depts.get
  .then((depts) => {
    res.json({
      depts
    })
  })
};