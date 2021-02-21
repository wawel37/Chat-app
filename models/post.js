var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    body: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    room: {type: Schema.Types.ObjectId, ref: 'Room', required: true}
});



module.exports = mongoose.model('Post', PostSchema);