const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({ 
    courseName: {
        type: String,   
        required: true, 
        unique: true   
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    level:{
        type: String,
        required: false,
        default: ''
    },
    lessonCount:{
        type: Number,
        required: false,
        default: ''
    },
    lessonCount:{
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
