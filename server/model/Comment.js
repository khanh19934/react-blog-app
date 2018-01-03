const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
    content:String,
    user:{type:Schema.Types.ObjectId,ref:'User'},
    commentAt:{type:Date,default:Date.now}
});

module.exports = CommentSchema;