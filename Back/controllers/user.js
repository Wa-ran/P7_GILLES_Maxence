const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { encrypt, decrypt } = require('../middlewares/crypto');

exports.signup = async (req, res, next) => {
  try {
    let email = encrypt(req.body.email);
    let password = await bcrypt.hash(req.body.password, 10)
    let user = {
        ...req.body,
        email,
        password
      };
    res.status(201).json( user )  
  } catch {
    res.status(401).json({ error });
  }
};

// exports.login = (req, res, next) => {
//   const mask = encrypt(req.body.email);
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