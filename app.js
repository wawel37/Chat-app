var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var io = require('socket.io');
var {socketConnection, socketJwtVerification} = require('./socketControllers');
require('dotenv/config');

var app = express();
var server = http.Server(app);
var io = io(server);

//MiddleWares
//(things that every request go through, for exapmle a function with req, res and next params)
app.use(bodyParser.json());

//Mongoose connection
mongoose.connect(
    process.env.DB_CONNECTION_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
    console.log('Successfully connected to MongoDB!');
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));


//Routes
const postsRoute = require('./routes/posts');
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const roomRoute = require('./routes/rooms');

app.use('/', indexRoute);
app.use('/posts', postsRoute);
app.use('/auth', authRoute);
app.use('/rooms', roomRoute);

//Setting up the socket connection
socketJwtVerification(io);
socketConnection(io);



//Server listening
server.listen(process.env.PORT, () => {
    console.log('Listening at port ' + process.env.PORT);
});





