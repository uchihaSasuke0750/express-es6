const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true
    },
    email:{
        type: String ,
        required: true ,
        unique: true
    },
    password:{
        type: String ,
        required: true
    },
    mobile:{
        type: String ,
        required: true
    },
    status:{
        type: Boolean ,
        required: true
    },
    otp:{
        type: String 
    },
    credit:{
        type: Number 
    },


});

module.exports = User = mongoose.model('user' , UserSchema);