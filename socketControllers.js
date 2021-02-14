const Post = require('./models/post');
const async = require('async');


function socketConnection(io){
    io.on('connection', (socket) =>{

        //When someone sends the post he also gets posts update with the new post
        //TODO caching
        socket.on('send post', (data) => {
            const post = new Post({
                title: data.title,
                body: data.body,
                date: data.data
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

exports.socketConnection = socketConnection;