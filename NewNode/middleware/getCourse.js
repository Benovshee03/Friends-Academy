const Course = require('../models/course');

async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id)
        if (course == null) {
            return res.status(404) // not bulundu
                .json({ message: 'Category not found' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.course = course;
    next();  
}

module.exports = getCourse;



// 100 -> Informational
// 200 -> Success, Created, Accepted
// 300 -> Redirection
// 400 -> Client Error (Kullanıcı bazlı)
// 500 -> Server Error (Sunucu bazlı)