const Users = require('../models/users'); // import du model user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Inscription // route Signup :

exports.signup = (req, res, next) => {


  let { firstname, lastname, brandname, email, tel, password, verifpassword } = req.body;

  if (!firstname || !lastname || !email || !tel || !password || !verifpassword) {
    return res.send("empty")
  }

  if (password !== verifpassword) {
    return res.send("password")
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
      }).then((newUser) => {
        console.log(newUser)
        return res.send("ok")
      }).catch((err) => console.log(err))
    };
    return res.send("mail");
  });

};

//connexion // Route Login :

exports.login = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // ou hash ??
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
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

// Chopper tous les utilisateurs // route Users
exports.getAllUsers = (req, res, next) => {
  Users.find().then((user) => {
    res.status(200).json(user);
  }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneUser = (req, res, next) => {
  Users.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getToken = (req, res, next) => {

  const authorization = req.headers.authorization;
  if (!authorization) { return res.sendStatus(403) };
  const token = authorization.split(" ")[1];
  console.log(token)
  if (!token) { return res.senStatus(400) }
  jwt.verify(token, 'RANDOM_TOKEN_SECRET', function (err, decoded) {
    if (err) return res.sendStatus(418)
    let id = decoded.userId

    Users.findOne({
      _id: id
    }).then((existUser) => {
      res.send(existUser)
    }
    )
  })
};

exports.modifySC = (req, res, next) => {
  Users.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      user.stableCoins = req.body.stableCoins
      user.updateOne({
        stableCoins: user.stableCoins
      }, function (err, result) {
        if (err) {
          // console.log(err)
          res.status(500).json({ message: "une erreur s'est produite" });
        } else {
          //console.log("Result :", result) 
          res.json({ message: "image mise à jour" });
        }
      });
    });
};

exports.modifyData = (req, res, next) => {

  let { email,
    newfirstname,
    newlastname,
    newemail,
    newtel,
    newbrandname,
    newadress,
    newRib
    } = req.body,

    newSC = req.body.stableCoins

  Users.findOneAndUpdate({ email: email }
    , {
      $set: {
        firstname: newfirstname,
        lastname: newlastname,
        email: newemail,
        tel: newtel,
        brandname: newbrandname,
        adress: newadress,
        stableCoins:newSC
        }, 
      $push: { rib: newRib }
    }
        
      
     , { new: true }
    , (err, change) => {
      if (err) { res.send(err) }
      else { res.send(change) }
    })
},

exports.getCoins = (req, res, next) => {
  Users.findOne({
    _id: req.body.id
  })
    .then((user) => {
    
      user.updateOne({
        stableCoins: (Number(user.stableCoins) + Number(req.body.stableCoins))
      }, function (err, result) {
        if (err) {
          res.status(500).json({ message: "Votre compte n'a pu être crédité" })
        } else {
          res.json({ message: "Votre compte a été crédité"})
        }
      })
    })
}










