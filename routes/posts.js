const router = require('express').Router();
const Post = require('../models/post');
const async = require('async');
const jwtVerification = require('../middleWares/jwtVerification');
const mongoose = require('mongoose');

//GETTING ALL POSTS 
router.get('/', jwtVerification, (req, res, next) =>{
    async.series({
        findAll: function(callback){
            Post.find({})
            .populate('user')
            .populate({
                path: 'room',
                populate: {
                    path: 'users'
                }
            })
            .exec(callback);
        } 
    },
    function(err, result){
        if(err){
            res.status(400).json(err);
            return;
        }
        res.json(result.findAll);
        console.log(req.ip + ' got the results');
    });
});

//GETTING SPECIFIC POST BY ID
router.get('/:postId', jwtVerification, (req, res, next) =>{
    async.series({
        find: function(callback){
            Post.findById(req.params.postId)
            .populate('user')
            .populate('room')
            .populate({
                path: 'room',
                populate: {
                    path: 'users'
                }
            })
            .exec(callback);
        }
    },
    function(err, result){
        //IF WE DONT FIND ANYTNIHG
        if(err){
            res.json({
                message: 'Didn\'t find any matching results'
            });
            return;
        }
        res.json(result.find);
    });
});

//GETTING ALL THE POST FROM THE GIVEN ROOMID
router.get('/room/:roomId', (req, res) =>{
    async.series({
        find: function(callback){
            Post.find({
                room: mongoose.Types.ObjectId(req.params.roomId)
            }).populate('user')
            .populate('room')
            .exec(callback);
        }
    }, function(err, result){ 
        if(err){
            return res.status(400).json(err);
        }
        return res.json(result.find);
    })
});

//POSTING NEW POST
router.post('/', (req, res, next) =>{
    const post = new Post({
        user: req.body.userId,
        body: req.body.body,
        date: req.body.date,
        room: req.body.roomId
    });
    //TODO:
    //Need to check if the user exists and the user belongs to the certain chatroom
    async.series({
        save: function(callback){ //callback here is the function executed after the post.save is done;
            post.save(callback);
        }},
        function(err, result){
            if(err){
                res.status(400).json(err);
                return;
            }
            res.json(result.save);
        }
    );
});

//DELETING SPECIFIC POST BY ID
router.delete('/:postId', (req, res, next) =>{
    async.series({
        remove: function(callback){
            Post.remove({_id: req.params.postId}, callback);
        }
    }, function(err, result){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.json(result.remove);
    });
});

//UPDATING SPECIFIC POST BY ID
router.patch('/:postId', (req, res, next) =>{
    async.series({
        update: function(callback){
            //RETURN FINDONEANDUPDATE RETURN NODE VALUE BEFORE THE UPDATE
            Post.findOneAndUpdate({_id: req.params.postId}, req.body, callback);
        }
    }, function(err, result){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.json(result.update);
    });
});


module.exports = router;