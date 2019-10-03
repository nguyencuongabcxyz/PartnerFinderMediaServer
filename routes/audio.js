const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/audio/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.toLowerCase());
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/ogg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/', upload.single('audio'), (req, res) => {
    console.log(req.file);
    if (req.file) {
        res.send({ successfull: true, error: false, name: req.file.filename })
    } else {
        res.send({ successfull: false, error: true })
    }
});

router.delete('/:name', (req, res) => {
    const path = `public/audio/${req.params.name}`;
    fs.unlink(path, (err) => {
        if (err) {
            res.send({ successfull: false, error: true });
        } else {
            res.send({ successfull: true, error: false});
        }
    })
});

module.exports = router;
