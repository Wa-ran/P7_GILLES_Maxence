const groupomania = require('./groupomania');

const { encrypt, decrypt } = require('../middlewares/crypto');


exports.getDeptsList = async () => {
  let dept = [];

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT nom FROM departement')
    .execute(
      function (row) {
        row.forEach(nom => {
          dept.push(nom)
        })
      })
    }
  )
  .catch(() => {
    throw {custMsg : 'Problème lors de la récupération des départements.'}
  })
  return dept
};

exports.checkDept = async (departement) => {
  await this.getDeptsList()
  .then((depts) => { // Check de l'input departement
    let match = false;
    depts.forEach((dept) => {
      if (encrypt(dept) === encrypt(departement)) {
        match = true;
        return departement = dept;
      }
    });
    if (!match) {
      throw {custMsg : ' !! dept ne correspond pas !! '}
    }
  })
};

exports.getLastAnnonce = async () => {
  let annonce = {};
  await groupomania.connect
  .then(function () {
    return session.sql('CALL last_annonce()')
    .execute(object => { annonce = object[0] })
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
  return annonce;
};

exports.getGroupeList = async () => {
  let groupeList = [];
  await groupomania.connect
  .then(function () {
    return session.sql('SELECT JSON_OBJECT(\'nom\', nom, \'description\', description) FROM groupe;')
    .execute(
      function (row) {
        row.forEach(groupe => {
          groupeList.push(groupe)
        })
      }
    )
  })
  .catch(() => {
    throw {custMsg : 'Problème lors de la récupération des groupes.'}
  })
  return groupeList;
};

exports.getGroupeContent = async (groupeName) => {
  let content = [];
  await groupomania.connect
  .then(function () {
    return session.sql('CALL groupe_content(\'' + groupeName + '\')')
    .execute(
      function (row) {
        row.forEach(part => {
          content.push(part)
        })
      }
    )
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Erreur lors de la récupération du contenu de ' + groupeName + '.'}
      }
    })
  })
  return content;
};

exports.postGroupe = async (req) => {
  await groupomania.connect
  .then(() => {
    return session.sql('CALL create_groupe(\''+ req.groupe +'\', \''+ req.description +'\', \''+ req.email +'\');')
    .execute() // pas de renvoi sauf erreurs
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
};

exports.postParticipation = async (req) => {
  await groupomania.connect
  .then(() => {
    console.log(req)
    return session.sql('CALL create_participation(\''+ req.groupe +'\', \''+ req.email +'\', \''+ req.titre +'\', \''+ req.preview +'\', \''+ req.article +'\');')
    .execute() // pas de renvoi sauf erreurs
    .catch((error) => {
      if (error.info.code === 9999) {
        throw {custMsg: error.info.msg}
      } else {
        console.log(error);
        throw {custMsg: 'Problème lors de la procédure...'}
      }
    })
  })
};