const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, 'RANDOM_TOKEN_SECRET', function(err, decoded) {
    try {
      if (err) {
        throw { custMsg: 'Identifiant utilisateur invalide' }
      };
      const tokenId = decoded.tokenId;
      if (req.body.id && req.body.id !== tokenId) {
        throw { custMsg: 'Identifiant utilisateur non reconnu' }
      } else {
        req.body.id = tokenId;
        next();
      }
    } catch (error) {
      console.log(error);
      let msg = error.custMsg ? error.custMsg : "Veuillez vous reconnecter.";
      res.status(500).send({ msg , err: "Erreur lors de la connexion." });
    }
  });
};