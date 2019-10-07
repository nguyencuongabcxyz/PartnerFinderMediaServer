const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.toLowerCase());
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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

router.get('/', (req, res) => {
    res.send('abcxyz');
});

router.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
<<<<<<< HEAD
        console.log(req.file);
=======
>>>>>>> e9c0853911ab2d3c39510803e75446fff0a0515a
        res.send({ successfull: true, error: false, name: req.file.filename })
    } else {
        res.send({ successfull: false, error: true })
    }
});

router.delete('/:name', (req, res) => {
    const path = `public/images/${req.params.name}`;
    fs.unlink(path, (err) => {
        if (err) {
            res.send({ successfull: false, error: true });
        } else {
            res.send({ successfull: true, error: false});
        }
    })
});

module.exports = router;
