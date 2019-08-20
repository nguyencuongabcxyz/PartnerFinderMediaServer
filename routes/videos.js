const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.toLowerCase());
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/ogg' || file.mimetype === 'video/webm') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30
    },
    fileFilter: fileFilter
});

router.post('/', upload.single('video'), (req, res) => {
    try {
        if (req.file) {
            res.send({ successfull: true, error: false })
        } else {
            res.send({ successfull: false, error: true })
        }
    } catch (err) {
        if (err instanceof multer.MulterError) {
            res.send({ successfull: false, error: true , message: err.message})
        } else if (err) {
            res.send({ successfull: false, error: true , message: err.message})
        }
    }
});

router.delete('/:name', (req, res) => {
    const path = `public/videos/${req.params.name}`;
    fs.unlink(path, (err) => {
        if (err) {
            res.send({ successfull: false, error: true });
        } else {
            res.send({ successfull: true, error: false });
        }
    })
});

module.exports = router;
