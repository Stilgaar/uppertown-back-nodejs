var express = require('express');
var app = express();
const fileUpload = require("express-fileupload")
app.use(fileUpload());

const upload = {

    // toper le NODE JS UPLOAD SUR FTP \o/

    newUp(req, res, next) {
        if (req.files === null) {
            return res.status(400).json({ message: "pas d'upload" });
        }

        let file  = req.files.file;


        file.mv(`${__dirname}/uploads/${file.name}`, err => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
        })
    }
}

module.exports = upload;

// HURLE http:// ${file.name}${file.chemin}