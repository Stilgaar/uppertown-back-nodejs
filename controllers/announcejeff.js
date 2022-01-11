const multer = require('multer');
const path = require('path');
const Announces = require("../models/announces");


// partie Multer gérant l'arrivée des images
const storageImages = multer.diskStorage({
    destination: `image`,
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname
            + `-`
            + Date.now()
            + path.extname(file.originalname))
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(null, false)
    }
}

const uppingImage = multer({
    storage: storageImages,
    limit: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('image', 5)

// gestion des annonces
const annoncejeff = {
    // création de l'annonce


    createAnnounces(req, res) {

        uppingImage(req, res, (err) => {
            let { title, content, city, zip_code, region, type,
                bedrooms, surface, price, share_price, gross_rent_by_year,
                monthly_cost, piscine, tennis, jardin, parking, jaccuzi, share_number } = req.body;

            console.log(req.body)
            console.log(req.files)

            if (err) { res.send(err) }
            else {

                // if (piscine === 'on') { return piscine = "pisince" }
                Announces.create({
                    share_number,
                    title,
                    content,
                    city,
                    zip_code,
                    type,
                    region,
                    bedrooms,
                    surface,
                    price,
                    share_price,
                    gross_rent_by_year,
                    monthly_cost,
                    options: [piscine, tennis, jardin, parking, jaccuzi],
                    image: req.files.map((images) => `${req.protocol}://${req.get("host")}/image/${images.filename}`)
                })
                    .then(() => { res.send('annonce crée') })
                    .catch((err) => res.send(err))
            }
        })
    },

    // recuperation de toutes les annonces
    getAnnounces(req, res, next) {
        Announces.find({})
            .then(announces => res.send(announces))
            .catch(err => res.send(err))
    },

    // supprimer une anonce
    deleteAnnounces(req, res, next) {
        Announces.deleteOne({ _id: req.params.id })
            .then(() => res.rend('supprimé'))
            .catch(err => res.send(err))
    },

    getOneAnnounces(req, res, next) {
        Announces.findOne({ _id: req.params.id, })
            .then(announce => res.send(announce))
            .catch(err => res.send(err))

    }
}

module.exports = annoncejeff;