const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({ 
    question: {
        type: String,   
        required: true, 
        unique: true   
    },
    image: {
        type: String,
        required:false
    },
    category:{
        type: String,
        required: false,
        default: ''
    },
    correctAnswer:{
        type: String,
        required: false,
        default: ''
    },
    first:{
        type: String,
        required: false,
        default: ''
    },
    second:{
        type: String,
        required: false,
        default: ''
    },
    third:{
        type: String,
        required: false,
        default: ''
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now // oluşturulma tarihi, varsayılan olarak şu anın zamanını alır
    }
}, { collection: 'Tests' }); // Collection adını burada belirtiyoruz

module.exports = mongoose.model('Test', testSchema);
