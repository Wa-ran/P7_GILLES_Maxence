const bcrypt = require('bcrypt');

const { encrypt, decrypt } = require('../middlewares/crypto');

exports.cryptData = async (data) => {
  let saneData = {};
  saneData['verifPass'] = data.password;
  try {
    for (const [key, value] of Object.entries(data)) {
      if (key.match(/(departement)/)) { // la vérifiaction des département est gérée postérieurement
        saneData[key] = value
      }
      else if (key.match(/(assword)/)) {
        saneData[key] = await bcrypt.hash(value, 10)
      }
      else {
        saneData[key] = encrypt(value)
      }
    }
    return saneData
  } catch (error) {
    throw { log: 'cryptData', custMsg: "Le format des données n'est pas accepté." }
  }
};

exports.cryptGPM = async (data) => {
  try {
    for (const [key, value] of Object.entries(data)) {
      if ((key === 'groupe') || (key === 'titre')) {
        data[key] = encrypt(value)
      }
    }
    return data
  } catch (error) {
    throw { log: 'cryptGPM', custMsg: "Le format des données n'est pas accepté." }
  }
};

exports.decryptGPM = async (data) => {
    for (const [key, value] of Object.entries(data)) {
      if ((key.match(/(nom)/)) || (key.match(/(titre)/))) {
        data[key] = decrypt(value)
      }
    }
  return data
};