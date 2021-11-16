const Sales = require("../models/sales");

exports.createSales = (req, res, next) => {
  console.log(req?.body);
  delete req.body._id;
  const sale = new Sales({
    ...req.body,
});
  sale
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

exports.getOneSales = (req, res, next) => {
  Sales.findOne({
    _id: req.params.id,
  })
    .then((sale) => {
      res.status(200).json(sale);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.updateSales = (req, res, next) => {
  console.log(req.body);
  Sales.findOne({
    _id: req.params.id,
  })
  .then((sale) => {
    sale.announceId = req.body.announceId
    sale.userId = req.body.userId
    sale.token = req.body.token
    sale.sc = req.body.sc
    sale.date = Date

    sale.updateOne({
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

exports.deleteSales = (req, res, next) => {
  Sales.deleteOne({ _id: req.params.id })
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
exports.getSales = (req, res, next) => {
  Sales.find({}).then((sale) => {
    res.send(sale);
  });
};
