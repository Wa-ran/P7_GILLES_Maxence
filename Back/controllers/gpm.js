const gpm = require('../middlewares/gpm');
const { cryptData, decryptData } = require('../middlewares/sanitizer');

exports.getDeptsList = (req, res, next) => {
  gpm.getDeptsList()
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.getLastAnnonce = (req, res, next) => {
  gpm.getLastAnnonce()
  .then(async (annonce) => {
    let content = await decryptData(annonce);
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.getGroupeList = (req, res, next) => {
  gpm.getGroupeList()
  .then((list) => {
    let content = [];
    list.forEach(async groupe => {
      let decrypt = await decryptData(groupe);
      content.push(decrypt)
    });
    return content
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

// Groupes

exports.getGroupeContent = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.getGroupeContent(data)
  })
  .then((groupe) => {
    let content = [];
    groupe.forEach(async participation => {
      let decrypt = await decryptData(participation);
      content.push(decrypt)
    });
    return content
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.postGroupe = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.postGroupe(data)
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.getGroupeMember = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.getGroupeMember(data)
  })
  .then((groupe) => {
    let content = [];
    groupe.forEach(async participation => {
      let decrypt = await decryptData(participation);
      content.push(decrypt)
    });
    return content
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.putGroupeMember = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.putGroupeMember(data)
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

// Participations

exports.getParticipationInfos = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.getParticipationInfos(data)
  })
  .then((participation) => {
    let content = [];
    participation.forEach(async info => {
      let decrypt = await decryptData(info);
      content.push(decrypt)
    });
    return content
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.postParticipation = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.postParticipation(data)
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.getParticipationMember = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.getGroupeMember(data)
  })
  .then((groupe) => {
    let content = [];
    groupe.forEach(async participation => {
      let decrypt = await decryptData(participation);
      content.push(decrypt)
    });
    return content
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.putParticipationMember = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.putParticipationMember(data)
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

// Commentaires

exports.getParticipationComment = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.getParticipationComment(data)  
  })
  .then((participation) => {
    let content = [];
    participation.forEach(async comm => {
      let decrypt = await decryptData(comm);
      content.push(decrypt)
    })
    return content
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};

exports.postCommentaire = (req, res, next) => {
  cryptData(req)
  .then((data) => {
    return gpm.postCommentaire(data)
  })
  .then((content) => {
    if (!content) {
      res.sendStatus(201)
    } else {
      if (Object.entries(content).length === 0 ) {
        res.sendStatus(404)
      } else {
        res.send(content)
      }
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};