const AnnouncesModel = require('../models/announces')



const announces = {

    getAnnounces(req, res, next) {
        AnnouncesModel.find({
        }).then((announces) => {
            res.send(announces)
        })
    },






};

module.exports = announces;
