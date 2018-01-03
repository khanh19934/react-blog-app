const mongoose = require('mongoose');
const {Schema} = mongoose;
const CommentSchema = require('./Comment');
const BlogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{type:Schema.Types.ObjectId,ref:'User'},
    comment:[CommentSchema],
    likes:{
        type:Number,
        default:0
    }
});
// BlogSchema.index({title:'text',content:'text'});

const Blog = mongoose.model('Blog',BlogSchema);
module.exports = Blog;