const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({ 
    // interface Question {
    //     question: string;
    //     image: string;
    //     category: string;
    //     correctAnswer: string;
    //     first: string;
    //     second: string;
    //     third: string;
    //   }
    question: {
        type: String,   
        required: true, 
        unique: true   
    },
    image: {
        type: String,
        required: false,
        default: ''
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
}, { collection: 'Courses' }); // Collection adını burada belirtiyoruz

module.exports = mongoose.model('Course', courseSchema);
