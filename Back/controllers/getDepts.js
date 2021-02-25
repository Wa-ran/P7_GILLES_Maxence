const mysqlx = require('@mysql/xdevapi');
const config = {
    password: 'pass',
    user: 'root',
    host: '127.0.0.1',
    port: 33060,
    schema: 'groupomania'
};

exports.get = (req, res, next) => {
  mysqlx.getSession(config)
  .then(function (s) {
    session = s;
    session.sql('USE groupomania').execute();
  })
  .then(function () {
    let dept = [];
    return Promise.all([
      session.sql('SELECT nom FROM departement').execute(function (row) {
        row.forEach(nom => {
          dept.push(nom)
        })
      })
    ])
    .then(() => { return dept })
  })
  .then((depts) => {
    res.json({
      depts
    })
  })
};