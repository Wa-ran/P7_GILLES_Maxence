const gpm = require('../middlewares/gpm');
const { cryptData, decryptData } = require('../middlewares/sanitizer');

let fctMap = [
  {route: '/depts', fct: 'DeptsList'},
  {route: '/lastAnnonce', fct: 'LastAnnonce'},
  // Groupes
  {route: '/groupeList', fct: 'GroupeList'},
  {route: '/groupe/:groupe', fct: 'GroupeContent'},
  {route: '/groupe/create', fct: 'Groupe'},
  {route: '/groupe/:groupe/member', fct: 'GroupeMember'},
  {route: '/groupe/grant', fct: 'GroupeMember'},
  // Participations
  {route: '/participation/:participationId', fct: 'ParticipationInfos'},
  {route: '/participation/create', fct: 'Participation'},
  {route: '/participation/:participationId/member', fct: 'ParticipationMember'},
  {route: '/participation/:participationId/grant', fct: 'ParticipationMember'},
  // Commentaires
  {route: '/participation/:participationId/commentaire', fct: 'ParticipationComment'},
];

exports.setFct = (req, res, next) => { // Impoosible de définir dynamiquement la gpm.fct sans passer par le req (la callback du router doit avoir les arguments (req, res, next) et RIEN d'autre, gpm.sendIt('ma fct') ne marche pas)
  let params = { ...req.params };
  let path = req.path.split('/');
  let route = '';
  if (Object.entries(params).length > 0) {
    for (const [key, value] of Object.entries(params)) {
      path.forEach(el => {
        if (value === decodeURIComponent(el)) route = route + '/:' + key
        else if (el !== '') route = route + '/' + el;
      })
    }
  } else {
    route = req.path
  };

  for (let pair of fctMap) {
    if (route === pair.route) {
      req['fct'] = req.method.toLowerCase() + pair.fct
    }
  };

  next();
};

exports.sendIt = async (req, res) => {
  await cryptData(req)
  .then((data) => {
    return gpm[req.fct](data)
  })
  .then(async (data) => {
    if (!data) { // Pas de contenu = objet créé
      res.sendStatus(201)
    }
    else if (!data.value && data.length === 0) { 
      res.sendStatus(404)
    }
    else {
      data = await decryptData(data);
      res.send(data)
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};