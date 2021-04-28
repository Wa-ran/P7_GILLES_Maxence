const bcrypt = require('bcrypt');

const { encrypt, decrypt } = require('../middlewares/crypto');

exports.cryptData = async (req) => {
  if (req.body.id) req.body['id'] = parseInt(req.body.id); // JWT 'stringify' tous les payloads

  if (req.body.tokenId && req.body.tokenId !== req.body.id) { // Uniquement en envoi de file
    throw { custMsg: "Identifiant utilisateur invalide !" }
  }

  let saneData = {};
  saneData['verifPass'] = req.body.password;
  req.params.participationId ? req.body['idParticipation'] = parseInt(req.params.participationId) : '';
  req.params.groupe ? req.body['groupe'] = decodeURIComponent(req.params.groupe) : '';

  try {
    for (const [key, value] of Object.entries(req.body)) {
      if (key.match(/(email)|(nom)|(groupe)|(titre)/)) { 
        saneData[key] = encrypt(value)
      }
      else if (key.match(/(password)/)) {
        saneData[key] = await bcrypt.hash(value, 10)
      }
      else if (key.match(/(departement)/)) {
        saneData[key] = value // Département vérifé ultérieurement
      }
      else if (key.match(/^(id)/)) {
        if (!Number.isInteger(value)) {
          throw error
        } else {
          saneData[key] = value
        }
      }
      else if (!Number.isInteger(value)) {
        saneData[key] = encrypt(value)
      }
    }
    return saneData
  } catch (error) {
    throw { custMsg: "Le format des données n'est pas accepté." }
  }
};

exports.decryptData = async (data) => {
  for (const [key, value] of Object.entries(data)) {
    if (!Number.isInteger(value) && !key.match(/(departement)|(password)|(date)/)) {
      data[key] = decrypt(value)
    }
  }
return data
};