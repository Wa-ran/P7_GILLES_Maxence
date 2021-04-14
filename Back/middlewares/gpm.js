const groupomania = require('./groupomania');

const { encrypt, decrypt } = require('../middlewares/crypto');


exports.getDeptsList = async () => {
  let dept = [];

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT nom FROM departement')
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

exports.checkDept = (departement) => {
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

exports.getGroupeContent = async (groupeName) => {
  let content = [];
  await groupomania.call('groupe_content', groupeName)
    .then((row) => {
      row.forEach(part => {
        content.push(part)
      })
    })
  return content;
};

exports.postGroupe = async (req) => {
  req.public ? req.public = 1 : req.public = 0;

  await groupomania.call('create_groupe', req.groupe, req.description, req.id, req.public)
};

exports.getGroupeMember = async (groupeName) => {
  let content = [];
  await groupomania.call('groupe_member', groupeName)
    .then((row) => {
      row.forEach(part => {
        content.push(part)
      })
    })
  return content;
};

exports.putGroupeMember = async (req) => {
  await groupomania.call('grant_groupe_right', req.groupe, req.id, req.idNewMember, req.newAdmin)
};

// Participations

exports.getParticipation = async (participationId, userId) => {
  let content = [];
  await groupomania.call('participation_content', participationId, userId)
    .then((row) => {
      row.forEach(part => {
        content.push(part)
      })
    })
  return content;
};

exports.postParticipation = async (req) => {
  req.public ? req.public = 1 : req.public = 0;
  req.importance ? req.importance = 100 : req.importance = 0;

  await groupomania.call('create_participation', req.groupe, req.id, req.titre, req.preview, req.article, req.importance, req.public)
};

exports.getParticipationMember = async (participationId) => {
  let content = [];
  await groupomania.call('participation_member', participationId)
    .then((row) => {
      row.forEach(part => {
        content.push(part)
      })
    })
  return content;
};

exports.putParticipationMember = async (req) => {
  await groupomania.call('grant_participation_right', req.participationId, req.id, req.idNewMember, req.newAdmin)
};

exports.postCommentaire = async (req) => {
  await groupomania.call('create_commentaire', req.id, req.participationId, req.contenu)
};