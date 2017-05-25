'use strict';
var cors = require('cors');
var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


var app = express();
var server = http.createServer(app);
var io = socketio(server);


app.use(cors());
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

io.on('connection', function (socket) {
    console.log('a user connected');
});

app.get('/api/startPlayerA', function (req, res) {

    console.log('game started');
    var i = 1;
    setInterval( function() {
        i++;
        console.log('current round ' + i);
        io.emit('playerARound', {
            rounds: i
        });
    },200)

});


server.listen(8080, () => {
    console.log('Ready to work')
});