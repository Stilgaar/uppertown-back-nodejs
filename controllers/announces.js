const Announces = require("../models/announces");

exports.createAnnounces = (req, res, next) => {
  //console.log(req?.files[0]?.filename);
  delete req.body._id;
  const announce = new Announces({
    
    ...req.body,

    /*image:[`${req.protocol}://${req.get('host')}/images/${req?.files[0]?.filename}`,
     `${req.protocol}://${req.get('host')}/images/${req?.files[1]?.filename}`,
    `${req.protocol}://${req.get('host')}/images/${req?.files[2]?.filename}`]*/
    
    image: {
      
      image1: `${req.protocol}://${req.get("host")}/images/${
        req?.files[0]?.filename
      }`,
      image2: `${req.protocol}://${req.get("host")}/images/${
        req?.files[1]?.filename
      }`,
      image3: `${req.protocol}://${req.get("host")}/images/${
        req?.files[2]?.filename
      }`,
      image4: `${req.protocol}://${req.get("host")}/images/${
        req?.files[3]?.filename
      }`,
      image5: `${req.protocol}://${req.get("host")}/images/${
        req?.files[4]?.filename
      }`,
    },
  });
  announce
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

exports.getOneAnnounces = (req, res, next) => {
  Announces.findOne({
    _id: req.params.id,
  })
    .then((announce) => {
      res.status(200).json(announce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyAnnounces = (req, res, next) => {
  console.log(req.body);
  Announces.findOne({
    _id: req.params.id,
  })
  .then((announce) => {
    announce.title = req.body.title
    announce.content = req.body.content
    announce.price = req.body.price
    announce.share_price = req.body.share_price
    announce.share_number = req.body.share_number
    announce.type = req.body.type
    announce.gross_rent_by_year = req.body.gross_rent_by_year
    announce.city = req.body.city
    announce.region = req.body.region
    announce.zip_code = req.body.zip_code
    announce.bedrooms = req.body.bedrooms
    announce.surface = req.body.surface
    announce.options = req.body.options

    announce.updateOne({
      share_number : req.body.share_number
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

exports.deleteAnnounces = (req, res, next) => {
  Announces.deleteOne({ _id: req.params.id })
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

exports.getAnnounces = (req, res, next) => {
  Announces.find({}).then((announces) => {
    res.send(announces);
  });
};
