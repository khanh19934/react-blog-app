const mongoose = require('mongoose');
const {Schema} = mongoose;
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    userName:String,
    address:String,
    phoneNumber:String,
    avatar:{
        data:Buffer,
        contentType:String
    },
    local:{
        email:{
            type:String,
            trim:true
        },
        password:{
            type:String,
            trim:true
        }
    },
    facebook:{
        id:String,
        email:String,
        name:String
    },
    google:{
        id:String,
        email:String,
        name:String
    }
});


UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    return _.pick(
        userObject,
        ['_id','google.id','google.email','google.name','facebook.id','facebook.email','facebook.name','local.email','userName','address','phoneNumber','avatar']
    );
}
const User = mongoose.model('User',UserSchema);

module.exports = User;  

