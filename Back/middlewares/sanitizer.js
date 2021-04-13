const bcrypt = require('bcrypt');

const { encrypt, decrypt } = require('../middlewares/crypto');

exports.cryptData = async (data) => {
  let saneData = {};
  saneData['verifPass'] = data.password;
  try {
    for (const [key, value] of Object.entries(data)) {
      if (key.match(/(email)|(nom)|(groupe)|(titre)/)) { // la vérifiaction des département est gérée postérieurement
        saneData[key] = encrypt(value)
      }
      else if (key.match(/(password)/)) {
        saneData[key] = await bcrypt.hash(value, 10)
      }
      else {
        saneData[key] = value
      }
    }
    return saneData
  } catch (error) {
    throw { log: 'cryptData', custMsg: "Le format des données n'est pas accepté." }
  }
};

exports.decryptData = async (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (key.match(/(email)|(nom)|(groupe)|(titre)/)) {
        data[key] = decrypt(value)
      }
    }
  return data
};