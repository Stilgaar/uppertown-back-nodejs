const { Users } = require('../models/users'); // import du model user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Inscription // route Signup :
exports.signup = (req, res, next) => {

  let { firstname, lastname, brandname, email, tel, password, verifpassword } = req.body;
  console.log(req.body)

  if (!firstname || !lastname || !email || !tel || !password || !verifpassword) {
    return res.send("Tous les champs ne sont pas remplis")
  }

  if (password !== verifpassword) {
    return res.send("Les mots de passe de correspondent pas")
  }

  return Users.findOne({ email: email }).then((emailAlreadyHere) => {

    if (emailAlreadyHere === null) {

      let hashed = bcrypt.hashSync(password, saltRounds)

      return Users.create({
        firstname,
        lastname,
        brandname,
        email,
        tel,
        password: hashed
      }).then(() => {
        return res.send("Compte crée avec Succéss !")
      }).catch((err) => console.log(err))
    };
    return res.send("Votre mail est deja utilisé");
  });

};

// Chopper tous les utilisateurs // route Users
exports.getAllUsers = (req, res, next) => {
  Users.find()
    .select([
      '-adress',
      '-ancientMontants',
      '-ancientMontantsEuro',
      '-brandname',
      '-created',
      '-montant',
      '-montantEuro',
      '-password',
      '-props',
      '-stableCoins',
      '-tel',
      '-trans',
      '-rib'])
    .then(user => res.send(user))
    .catch(err => res.send(err))
};

// Toutes les transactions d'un certain user
exports.getALlTransacs = (req, res, next) => {
  Users.findOne({ _id: req.params.id })
    .populate('trans')
    .then(rep => res.send(rep.trans))
};

// toutes les propriétés d'un certain user
exports.getAllProps = (req, res, next) => {
  Users.findOne({ _id: req.params.id })
    .populate('props')
    .then(rep => res.send(rep.props))
};

// CHOPPER UN SEUL USER
exports.getOneUser = (req, res, next) => {
  Users.findOne({ _id: req.params.id, })
    .then(user => res.send(user))
    .catch(error => res.send(err));
};


// check s'il y a un token actif, voir aussi si le token n'est pas expiré
exports.getToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) { return res.sendStatus(403) };
  const token = authorization.split(" ")[1];
  if (!token) { return res.senStatus(400) }
  jwt.verify(token, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
    if (err) { res.send('token expire') }
    else {
      let id = decoded.userId
      Users.findOne({
        _id: id
      }).then((existUser) => { res.send(existUser) }
      )
    }
  })
};

// LOGIN USER
exports.login = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.send("Utilisateur non trouvé");
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.send("Mot de passe Incorrect");
          }
          res.status(200).json({
            userId: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )

          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// MODIF USER
exports.modifyUser = (req, res, next) => {

  let {
    newfirstname,
    newlastname,
    newemail,
    newtel,
    newbrandname,
    newadress,
    newRib
  } = req.body

  Users.findOneAndUpdate({ _id: req.params.id }
    , {
      $set: {
        firstname: newfirstname,
        lastname: newlastname,
        email: newemail,
        tel: newtel,
        brandname: newbrandname,
        adress: newadress,
      },
      $push: { rib: newRib }
    }
    , { new: true }
    , (err, change) => {
      if (err) { res.send(err) }
      else { res.send(change) }
    })
};


// PARTIE ARGENT 
exports.addCoins = (req, res, next) => {
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      user.updateOne({
        stableCoins: (Number(user.stableCoins) + Number(req.body.stableCoins))
      }, function (err, result) {
        if (err) {
          res.send("Votre compte n'a pu être crédité")
        } else {
          res.send("Votre compte a été crédité")
        }
      })
    })
};

exports.archiveMoney = (req, res, next) => {
  let { argent } = req.body
  Users.findOneAndUpdate({ _id: req.params.id }
    , {
      $pull: { montant: argent },
      $push: { ancientMontants: `${argent} TRANSFERT FAIT LE ${new Date}` }
    },
    { new: true },
    (err, archive) => {
      if (err) { res.send(err) }
      else { res.send(archive) }
    })
};

exports.archiveEuros = (req, res, next) => {
  let { argent } = req.body
  Users.findOneAndUpdate({ _id: req.params.id }
    , {
      $pull: { montantEuro: argent },
      $push: { ancientMontantsEuro: `${argent} TRANSFERT FAIT LE ${new Date}` }
    }
    ,
    { new: true },
    (err, archiveEuro) => {
      if (err) { res.send(err) }
      else { res.send(archiveEuro) }
    }
  )
};

exports.transactionDone = (req, res, next) => {
  Users.findOneAndUpdate({ _id: req.params.id },
    { $set: { awaiting: false } },
    { new: true },
    (err, udpateAwaiting) => {
      if (err) { res.send(err) }
      else { res.send(udpateAwaiting) }
    })
};

exports.transtactionEuroDone = (req, res, next) => {
  Users.findOneAndUpdate({ _id: req.params.id },
    { $set: { awaitingEuro: false } },
    { new: true },
    (err, udpateAwaitingEuro) => {
      if (err) { res.send(err) }
      else { res.send(udpateAwaitingEuro) }
    })
};

exports.askMoney = (req, res, next) => {
  let { change, theRib, currentStable } = req.body;
  if (change >= currentStable) { res.send('error') }
  else {
    let newChange = parseInt(change)
    Users.findOneAndUpdate({ _id: req.params.id },
      {
        $set: { awaitingEuro: true, stableCoins: currentStable - newChange },
        $push: { montantEuro: `${change}€ transféré => RIB : ${theRib} le ${new Date}` }
      },
      { new: true },
      (err, updateTransfert) => {
        if (err) { res.send(err) }
        else { res.send(updateTransfert) }
      })
  }

};

exports.addMoney = (req, res, next) => {
  let { montant } = req.body;
  if (!montant) { res.send(err) }
  Users.findOneAndUpdate({ _id: req.params.id }
    , {
      $push: { montant: `${montant} SC demandé le ${new Date}` }
      , $set: { awaiting: true }
    }
    , { new: true }, (err, money) => {
      if (err) { res.send(err) }
      else res.send(money)
    })
};