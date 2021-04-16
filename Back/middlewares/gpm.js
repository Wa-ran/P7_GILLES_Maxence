const groupomania = require('./groupomania');

const { encrypt, decrypt } = require('../middlewares/crypto');

exports.verifRight = async (identifier, userId, accesReq) => {
  let publique = 0;
  let member = 0;
  let prive = 0;

  let table = Number.isInteger(identifier) ? 'participation' : 'groupe';
  let column = Number.isInteger(identifier) ? 'id' : 'nom';

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT COUNT(*) FROM utilisateur_' + table + ' WHERE ' + table + '_' + column + ' = \'' + identifier + '\' AND utilisateur_id = ' + userId + ';')
    .execute((row) => { member = row[0] })
  })
  .then(function () {
    if (member === 0) {
      return session.sql('SELECT publique FROM ' + table + ' WHERE ' + column + ' = ' + identifier + ';')
      .execute((row) => { publique = row[0] })    
    }
  })
  .then(function () {
    if ((member + publique) === 0 && (table === 'participation')) {
      return session.sql('SELECT prive FROM participation WHERE id = ' + identifier + ';')
      .execute((row) => { prive = row[0] })
    }
  })
  .catch((error) => {
    console.log(error);
    throw { custMsg : 'Problème lors de la vérification des droits.' }
  })
console.log(publique + ' ' + member + ' ' + prive + ' ' + accesReq)
  if ((publique + member - prive) < accesReq) {
    throw { custMsg : 'Vous n\'avez pas les droits.' }
  }
  // -1 => privé, non visible
  // 0 => visible, non membre
  // 1 ou 2 => membre, peut participer
};

exports.verifAdmin = async (identifier, userId) => {
  let admin = 0;

  let table = Number.isInteger(identifier) ? 'participation' : 'groupe';
  let column = Number.isInteger(identifier) ? 'id' : 'nom';

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT admin FROM utilisateur_' + table + ' WHERE ' + table + '_' + column + ' = ' + identifier + ' AND utilisateur_id = ' + userId + ';')
    .execute((row) => { admin = row[0] })
  })
  .catch((error) => {
    console.log(error);
    throw { custMsg : 'Problème lors de la vérification des droits d\'admin.' }
  })
  return admin
};

exports.getDeptsList = async () => {
  let dept = [];

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT nom FROM departement;')
    .execute((row) => {
        row.forEach(nom => {
          dept.push(nom)
        })
      })
    }
  )
  .catch(() => {
    throw { custMsg : 'Problème lors de la récupération des départements.' }
  })
  return dept
};

exports.checkDept = (data) => {
  let departement = data.departement;

  return this.getDeptsList()
  .then((depts) => { // Check de l'input departement
    let match = false;
    depts.forEach((dept) => {
      if (encrypt(dept) === encrypt(departement)) {
        match = true;
        return departement = dept;
      }
    });
    if (!match) {
      throw { custMsg : ' !! dept ne correspond pas !! ' }
    }
  })
};

exports.getLastAnnonce = async () => {
  let annonce = {};
  await groupomania.connect
  .then(() => {
    return session.sql('CALL last_annonce()')
    .execute(row => { annonce = row[0] })
  })
  return annonce;
};

exports.getGroupeList = async () => {
  let groupeList = [];
  await groupomania.connect
  .then(() => {
    return session.sql('SELECT JSON_OBJECT(\'nom\', nom, \'description\', description) FROM groupe;')
    .execute((row) => {
        row.forEach(groupe => {
          groupeList.push(groupe)
        })
      }
    )
  })
  .catch(() => {
    throw { custMsg : 'Problème lors de la récupération des groupes.' }
  })
  return groupeList;
};

// Groupes

exports.getGroupeContent = async (data) => {
  let content = [];
  await groupomania.call('groupe_content', data.groupe)
  .then((row) => {
    row.forEach(part => {
      content.push(part)
    })
  })
  return content;
};

exports.postGroupe = async (data) => {
  data.publique ? data.publique = 1 : data.publique = 0;

  await groupomania.call('create_groupe', data.groupe, data.description, data.id, data.publique)
};

exports.getGroupeMember = async (data) => {
  let content = [];
  await groupomania.call('groupe_member', data.groupe)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;    
};

exports.putGroupeMember = async (data) => {
  await this.verifAdmin(data.groupe, data.id, 1);
  await groupomania.call('grant_groupe_right', data.groupe, data.id, data.idNewMember, data.newAdmin)
};

// Participations

exports.getParticipationInfos = async (data) => {
  let content = [];
  await groupomania.call('participation_infos', data.idParticipation)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;
};

exports.postParticipation = async (data) => {
  data.publique ? data.publique = 1 : data.publique = 0;
  data.prive ? data.prive = 1 : data.prive = 0;
  data.importance ? data.importance = 100 : data.importance = 0;

  if ((data.publique + data.prive) === 2) {
    throw { custMsg: "Une participation ne peut être publique et privée !" }
  }
  await this.verifRight(data.groupe, data.id, 0);
  await groupomania.call('create_participation', data.groupe, data.id, data.titre, data.preview, data.article, data.importance, data.publique, data.prive)
};

exports.getParticipationMember = async (data) => {
  let content = [];
  await groupomania.call('participation_member', data.idParticipation)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;
};

exports.putParticipationMember = async (data) => {
  this.verifAdmin(data.idParticipation, data.id, 0);
  await groupomania.call('grant_participation_right', data.idParticipation, data.id, data.idNewMember, data.newAdmin)  
};

exports.getParticipationComment = async (data) => {
  let content = [];
  await this.verifRight(data.idParticipation, data.id, -1);
  await groupomania.call('participation_comment', data.idParticipation)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;
};

exports.postCommentaire = async (data) => {
  await this.verifRight(data.idParticipation, data.id, 0);
  await groupomania.call('create_commentaire', data.id, data.idParticipation, data.contenu)  
};