const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const gpm = require('../middlewares/gpm');
const { encrypt, decrypt } = require('../middlewares/crypto');

exports.signup = async (req, res, next) => {
  let user;
  let nom = encrypt(req.body.nom);
  let prenom = encrypt(req.body.prenom);
  let email = encrypt(req.body.email);
  let password = await bcrypt.hash(req.body.password, 10);
  let departement = req.body.departement;
  let exist = false;

  gpm.getDepts
  .then((depts) => { // Check de l'input departement
  let match = false;
    depts.forEach((dept) => {
      if (encrypt(dept) === encrypt(departement)) {
        match = true;
        return departement = dept;
      }
    });
    if (!match) {
      throw ' !! dept ne correspond pas !! '
    }
  })
  .then(() => { // Check si l'email est déjà enregistré
    return session.sql('SELECT COUNT(*) FROM utilisateur WHERE mail = \''+ email +'\';').execute(
      res => { if (res > 0) {
        return exist = true // Pas de throw depuis l'objet sql !!
      }
    });
  })
  .then(() => {
    if (exist) {
      throw 'Un utilisateur avec ce mail existe déjà'
    }
  })
  .then(() => { // Enregistrement de l'utilisateur
    return session.sql('CALL sign_up(\''+ nom +'\', \''+ prenom +'\', \''+ email +'\', \''+ password +'\', \''+ departement +'\');').execute()
  })
  .then(() => {
    return session.sql('SELECT * FROM utilisateur WHERE mail = \''+ email +'\';').execute((res) => {
      user = res;
    });
  })
  .then(() => {
    res.status(201).json( user )
  })
  .catch((error) => {
    res.status(500).json(error)
  })
};

// exports.login = (req, res, next) => {
//   const email = encrypt(req.body.email);
//   User.findOne({ email: mask })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Utilisateur non trouvé !?' });
//       }
//       bcrypt.compare(req.body.password, user.password)
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Mot de passe incorrect >:(' });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign(
//               { userId: user._id },
//               'RANDOM_TOKEN_SECRET',
//               { expiresIn: '24h' }
//             )
//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };

exports.login = (req, res, next) => {
  res.json({
    ...req.body,
    server: 'Waran'
  });
};