const Room = require('../models/room');
const mongoose = require('mongoose');
const router = require('express').Router();
const async = require('async');

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

router.get('/:roomId', (req, res) =>{
    async.series({
        find: function(callback){
            Room.findById(req.params.roomId)
            .populate('users')
            .exec(callback);
        }
    }, function(err, result){
        if(err){
            return res.status(404).json(err);
        }
        return res.json(result.find);
    })
});

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

