const multer = require('multer');
const path = require('path');
const Announces = require("../models/announces");

const storageImages = multer.diskStorage({
    destination: `image`,
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname
            + `-`
            + Date.now()
            + path.extname(file.originalname))
    }})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) { 
        return cb(null, true)
    } else {
        cb(null, false)
    }}

const uppingImage = multer({
    storage: storageImages,
    limit: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    } }).array('image', 5)

const annoncejeff = {

    createAnnounces(req, res) {

        uppingImage(req, res, (err) => {

            let { title, content, city, zip_code, region, type,
                bedrooms, surface, price, share_price, gross_rent_by_year,
                monthly_cost, piscine, tennis, jardin, parking, jaccuzi, share_number } = req.body;

            if (err) { res.send(err) }
            else {

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
                }).then(() => {
                    res.status(201).json({
                        message: "Post saved successfully!",
                    });
                })
                    .catch((error) => {
                        res.status(400).json({
                            error: error,
                        });
                    });
            }
        })
    }
}

module.exports = annoncejeff;