const mongoose = require('mongoose')

const WebPageSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true,
    },
    slug: {
        type: String ,
        required: true,
        unique: true
    },
    content:{
        type: String ,
    },
    created_by:{
        type: Number ,
        required: false ,
    },
    updated_by:{
        type: Number ,
        required: false ,
    },
    categories:{
        type:[Number] 
    },
    created_at:{
        type: Date ,
        default: Date.now
    },
    updated_at:{
        type: Date
    },
    deleted_at:{
        type: Date
    }

});

module.exports = User = mongoose.model('webPages' , WebPageSchema);