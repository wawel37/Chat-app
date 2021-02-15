var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = mongoose.Schema({
    name: {type: String, 
        required: true, 
        min: 6},
    email: {type: String,
        required: true,
        min:6},
    password: {type: String,
        min:6,
        required: true}
});

module.exports = mongoose.model('User', UserSchema);