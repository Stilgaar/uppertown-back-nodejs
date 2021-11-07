const Announces = require("../models/announces");

exports.createAnnounces = (req, res, next) => {
    //console.log("BODY :" + req.body);
    console.log(req?.files[0]?.filename)
    
    delete req.body._id;
    const announce = new Announces({
      ...req.body,
      image1: `${req.protocol}://${req.get('host')}/images/${req?.files[0]?.filename}`,
      image2: `${req.protocol}://${req.get('host')}/images/${req?.files[1]?.filename}`,
      image3: `${req.protocol}://${req.get('host')}/images/${req?.files[2]?.filename}`
      
      //image: `./images/${req.filename}`
      
    });
    announce
      .save()
      .then(() => {
        res.status(201).json({
          message: "Post saved successfully!"
        });
      }).then(() => {
        res.sendfile(image1)
      })
      .catch((error) => {
        res.status(400).json({
          error: error
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
          error: error
        });
      });
  };
  
  exports.modifyAnnounces = (req, res, next) => {
    const announce = new Announces({
        ...req.body
    });
    Announces.updateOne({ _id: req.params.id }, announce).then(() => {
      res.status(201).json({
        message: "Announce updated successfully!",
      });
    }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  exports.deleteAnnounces = (req, res, next) => {
    Announces.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
/*const announces = {
  getAnnounces(req, res, next) {
    Announces.find({}).then((announces) => {
      res.send(announces);
    });
  },
};

module.exports = announces;*/

exports.getAnnounces = (req, res, next) => {
    Announces.find({}).then((announces) => {
      res.send(announces);
    });
  };

