const Room = require('../models/room');
const mongoose = require('mongoose');
const router = require('express').Router();
const async = require('async');

//GETTING ALL THE ROOMS
router.get('/', (req, res) =>{
    async.series({
        findAll: function(callback){
            Room.find({})
            .populate('users')
            .exec(callback);
        }
    }, function(err, result){
        if(err){
            return res.status(404).json(err);
        }
        return res.json(result.findAll);
    });
});

//GETTING ROOM WITH THE SPECIFIC ID
router.get('/:roomId', (req, res) =>{
    async.series({
        find: function(callback){
            Room.findById(req.params.roomId)
            .populate('users')
            .exec(callback);
        }
    }, function(err, result){
        if(err){
            return res.status(400).json(err);
        }
        return res.json(result.find);
    })
});

//GETTING ALL THE ROOMS THAT THE USER IS ASSOCIATED WITH
router.get('/user/:userId', (req, res) =>{
    async.series({
        find: function(callback){
            Room.find({
                users: mongoose.Types.ObjectId(req.params.userId)
            }).populate('users')
            .exec(callback);
        }
    }, function(err, result){
        if(err){
            return res.status(400).json(err);
        }
        return res.json(result.find);
    });
});

//ADDING A NEW ROOM
router.post('/', (req, res) =>{
    const room = new Room({
        name: req.body.name,
        users: [mongoose.Types.ObjectId(req.body.userId)]
    });
    //TODO:
    //Need to check whether that user exists or not
    async.series({
       save: function(callback){
           room.save(callback);
       } 
    }, function(err, result){
        if(err){
            return res.status(400).json(err);
        }
        res.json(result.save);
    })
});

//UPDATING EXISTING ROOM WITH DATA
router.patch('/:roomId', (req, res) =>{
    async.series({
        update: function(callback){
            Room.findOneAndUpdate(
                {_id: req.params.roomId},
                { $push: {users: req.body.userId}},
                callback);
        }
    }
    , function(err, result){
        if(err){
            return res.status(400).json(err);
        }
        return res.send(result);
    });
});

module.exports = router;

