var express = require('express');
var app = express();

app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/Images'));
app.use('/audios', express.static(__dirname + '/audios'));
app.use('/html', express.static(__dirname + '/html'));
app.use('/videos', express.static(__dirname + '/videos'));

var server = app.listen(5000, () => console.log('abc'));