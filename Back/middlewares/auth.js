const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'RANDOM_TOKEN_SECRET', function(err, decoded) {
    try {
      if (err) {
        throw {custMsg: 'Identifiant utilisateur invalide'}
      };
      const tokenEmail = decoded.tokenId;
      if (req.body.email && req.body.email !== tokenEmail) {
        throw {custMsg: 'Identifiant utilisateur non reconnu'}
      } else {
        req.body.email = tokenEmail;
        next();
      }
    } catch (error) {
      console.log(error);
      let msg = error.custMsg ? error.custMsg : "Veuillez vous reconnecter.";
      res.status(500).send({msg , err: "Erreur lors de la connexion."});
    }
  });
};