const mongoose = require('mongoose')

const WebSectionSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true,
    },
    slug: {
        type: String ,
        required: true,
        unique: true
    },
    heading:{
        type: String ,
    },
    sub_heading:{
        type: String ,
    },
    content:{
        type: String ,
    },
    alignment_type:{
        type: Number ,
        required: false ,
    },
    sequence:{
        type: Number ,
        required: false ,
    },
    created_by:{
        type: Number ,
        required: false ,
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

module.exports = User = mongoose.model('webSections' , WebSectionSchema);