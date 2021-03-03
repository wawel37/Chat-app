const Post = require('./models/post');
const async = require('async');
const socketioJwt = require('socketio-jwt');

function socketConnection(io){
    io.on('connection', (socket) =>{

        //When someone sends the post he also gets posts update with the new post
        //TODO caching
        socket.on('send post', (data) => {
            console.log('dostlame posta');

            const post = new Post({
                title: data.title,
                body: data.body,
                date: data.date
            });
            
            async.series({
                post: function(callback){
                    post.save(callback);
                },
                get: function(callback){
                    Post.find({}, callback);
                }
            }, function(err, result){
                if(!err){
                    io.emit('update posts', result.get);
                }
            });
        });
    });
}

function socketJwtVerification(io){

    io.use(socketioJwt.authorize({
        secret: process.env.JWT_SECRET,
        handshake: true
    }));
}

exports.socketConnection = socketConnection;
exports.socketJwtVerification = socketJwtVerification;