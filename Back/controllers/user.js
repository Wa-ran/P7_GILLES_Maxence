const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const gpm = require('../middlewares/gpm');
const { encrypt, decrypt } = require('../middlewares/crypto');

exports.signup = async (req, res, next) => {
  let nom = encrypt(req.body.nom);
  let prenom = encrypt(req.body.prenom);
  let email = encrypt(req.body.email);
  let password = bcrypt.hash(req.body.password, 10);
  let departement = req.body.departement;

  await gpm.getDepts
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
  await gpm.createUser(nom, prenom, email, password, departement)
  .then(() => {
    res.status(201).send({ email: req.body.email })
  })
  .catch((error) => {
    res.status(500).json(error)
  })
};

// exports.login = (req, res, next) => {
//   const email = encrypt(req.body.email);
//   User.findOne({ email: mask })

//   .then(function () {
//     return session.sql('SELECT JSON_OBJECT(\'nom\', nom, \'prenom\', prenom, \'email\', mail, \'departement\', departement_nom) from utilisateur WHERE mail = \''+ email +'\';')
//     .execute(field => {
//       res.json(field[0])
//     })
//   })

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