var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = mongoose.Schema({
    name: {type: String, required: true}
})