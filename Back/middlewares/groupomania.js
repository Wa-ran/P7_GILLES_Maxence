const mysqlx = require('@mysql/xdevapi');
const config = {
    password: 'pass',
    user: 'root',
    host: '127.0.0.1',
    port: 33060,
    schema: 'groupomania'
};

exports.connect = mysqlx.getSession(config)
.then(function (s) {
  session = s;
  return session.sql('USE groupomania').execute();
})
.catch(() => {
  throw 'La connexion à la BDR a échouée !'
});

exports.call = async function(proc, ...args) {
  let row = [];

  let list = '';
  args.forEach(arg => {
    let el = "\'" + arg + "\',";
    list = list + el;
  });
  list = list.slice(0, list.length - 1); // Pour enlever la dernière ','

  await this.connect
  .then(() => {
    return session.sql('CALL ' + proc + '(' + list + ');')
    .execute((res) => { row.push(res[0]) })
  })
  .catch((error) => {
    this.errorHandler(error)
  })
  return row
};

exports.errorHandler = function(error, msg) {
  console.log(error);
  try {
    if (error.info.code === 9999) {
      custMsg = error.info.msg
    } else if (msg) {
      custMsg = msg
    } else {
      custMsg = "Erreur lors de la procédure."
    }  
  } catch (error) {
    custMsg = "Erreur lors de la procédure."
  }
  throw { custMsg }
}