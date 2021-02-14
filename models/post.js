var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    // user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true}
});



module.exports = mongoose.model('Post', PostSchema);