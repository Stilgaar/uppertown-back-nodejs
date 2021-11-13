const Properties = require("../models/properties");

exports.createProperties = (req, res, next) => {
  //console.log(req?.files[0]?.filename);
  console.log(req.body);
  delete req.body._id;
  const properties = new Properties({
    ...req.body,
});
  properties
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    }) /*.then(() => {
        res.sendfile(image1)
      })*/
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneProperties = (req, res, next) => {
    Properties.findOne({
    _id: req.params.id,
  })
    .then((properties) => {
      res.status(200).json(properties);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyProperties = (req, res, next) => {
  console.log(req.body);
  Properties.findOne({
    _id: req.params.id,
  })
  .then((properties) => {
    properties.idUser = req.body.idUser  
    properties.announceId = req.body.announceId
    properties.title = req.body.title
    properties.content = req.body.content
    properties.price = req.body.price
    properties.share_price = req.body.share_price
    properties.totalToken = req.body.totalToken
    properties.type = req.body.type
    properties.gross_rent_by_year = req.body.gross_rent_by_year
    properties.city = req.body.city
    properties.region = req.body.region
    properties.zip_code = req.body.zip_code
    properties.bedrooms = req.body.bedrooms
    properties.surface = req.body.surface
    properties.options = req.body.options
    properties.image = req.body.image

    properties.updateOne({
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
    /*.catch((error) => {
      res.status(400).json({
        error: error,
      });
    });*/
};

exports.deleteProperties = (req, res, next) => {
  Properties.deleteOne({ _id: req.params.id })
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

exports.getProperties = (req, res, next) => {
  Properties.find({}).then((properties) => {
    res.send(properties);
  });
};
