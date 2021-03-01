const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({
    title: {
        type: String ,
        required: true,
        unique: true
    },
    collection_type:{
        type: Number ,
        required: true ,
    },
    is_featured:{
        type: Number ,
        required: false ,
    },
    is_recommended:{
        type: Number ,
        required: false ,
    },
    categories:{
        type:[Number] 
    },
    tags:{
        type:[Number] 
    },
    saved_content: {
        _id: { type: Number , trim: true } ,
        description: { type: String , trim: true } ,
        author_name: { type: String , trim: true } ,
        author_description: { type: String , trim: true }
    },
    published_content: {
        _id: { type: Number , trim: true } ,
        description: { type: String , trim: true } ,
        author_name: { type: String , trim: true } ,
        author_description: { type: String , trim: true }
    },
    published_by:{
        type: Number ,
        required: false ,
    },
    published_at:{
        type: Number ,
        required: false ,
    },
    created_at:{
        type: Date ,
        default: Date.now
    }

});

module.exports = User = mongoose.model('collections' , CollectionSchema);