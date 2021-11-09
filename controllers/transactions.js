const Transactions = require("../models/transactions");

exports.createTransactions = (req, res, next) => {
  //console.log(req?.files[0]?.filename);
  delete req.body._id;
  const transaction = new Transactions({
    
    ...req.body,

  });
  transaction
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    }) 
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneTransactions = (req, res, next) => {
  Transactions.findOne({
    _id: req.params.id,
  })
    .then((transaction) => {
      res.status(200).json(transaction);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.updateTransactions = (req, res, next) => {
  console.log(req.body);
  Announces.findOne({
    _id: req.params.id,
  })
  .then((transaction) => {
    transaction.announceId = req.body.announceId
    transaction.userId = req.body.userId
    transaction.token = req.body.token
    transaction.sc = req.body.sc
    transaction.date = Date

    transaction.updateOne({
      ...req.body
    }, function (err, result) {
      if (err) {
        // console.log(err)
        res.status(500).json({ message: "une erreur s'est produite" });
      } else {
        //console.log("Result :", result) 
        res.json({ message: "données mises à jour" });
      }
    });
  });
};

exports.deleteTransactions = (req, res, next) => {
  Transactions.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.getTransactions = (req, res, next) => {
  Transactions.find({}).then((transaction) => {
    res.send(transaction);
  });
};
