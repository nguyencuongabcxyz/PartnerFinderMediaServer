const images = require('./routes/images');
const videos = require('./routes/videos');
const audio = require('./routes/audio');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/api/images', images);
app.use('/api/videos', videos);
app.use('/api/audio', audio);

app.listen(5000, () => console.log('Listening on port 5000...'))