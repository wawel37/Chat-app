var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Room', roomSchema);