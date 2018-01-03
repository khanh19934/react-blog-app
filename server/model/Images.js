const mongoose = require('mongoose');
const {Schema} = mongoose;

const ImageSchema = new Schema({
    img:{
        data:Buffer,
        contentType:String
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

const Item = mongoose.model('images',ImageSchema);

module.exports = Item;
