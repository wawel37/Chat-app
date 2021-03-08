const Post = require('./models/post');
const Room = require('./models/room');
const async = require('async');
const socketioJwt = require('socketio-jwt');
const mongoose = require('mongoose');

function socketConnection(io){
    io.on('connection', (socket) =>{

        //When someone sends the post he also gets posts update with the new post
        //TODO caching
        socket.on('send post', (data) => {

            const post = new Post({
                user: data.user._id,
                body: data.body,
                date: data.date,
                room: data.room
            });
            
            //Saving post and sending back the update
            async.series({
                post: function(callback){
                    post.save(callback);
                },
                get: function(callback){
                    Post.find({room: data.room})
                    .populate('user')
                    .populate('room')
                    .exec(callback);
                }
            }, function(err, result){
                if(!err){
                    io.emit('update posts', result.get);
                }
            });
        });

        socket.on('join rooms', (data) => {
            console.log('joining rooms');
            Room.find({
                users: mongoose.Types.ObjectId(data._id)
            })
            .populate('users')
            .then(rooms => {
                rooms.forEach(room =>{
                    socket.join(room._id.toString());
                });
            }).catch(err => {
                console.log(err);
            })
        });
    });
}

function socketJwtVerification(io){

    io.use(socketioJwt.authorize({
        secret: process.env.JWT_SECRET,
        handshake: true
    }));
}

//Returns Null if there was an error
function a(user){
    return Room.find({
        users: mongoose.Types.ObjectId(user._id)
    })
    .populate('users')
    .then(result => {
        return result;
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.socketConnection = socketConnection;
exports.socketJwtVerification = socketJwtVerification;

