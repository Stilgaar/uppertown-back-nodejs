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
    //CORRECTION IMPORTANTE A CONSERVER :  
    idUser: req.params.id,//ICI
    announceId: req.params.announceid
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

exports.getEachPropertiesList = (req, res, next) => {
  Properties.findOne({
  userId: req.params.id
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

exports.existsProperties = (req, res, next) => {
  Properties.exists({
  userId: req.params.id,
  announceId: req.params.announceid
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
  idUser: req.params.id,
  announceId: req.params.announceid
  })
  .then((properties) => {
    properties.totalToken = req.body.totalToken
    properties.updateOne({
      totalToken : properties.totalToken
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
