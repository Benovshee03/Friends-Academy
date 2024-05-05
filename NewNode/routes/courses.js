const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const getCourse = require('../middleware/getCourse');
const authenticationToken = require('../middleware/authenticationToken');

// GET ALL CATEGORIES
// path: /categories
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET COURSE BY ID
// path: /courses/:1

router.get('/:id', getCourse, async (req, res) => {
    res.send(res.course);
});


// ADD NEW COURSE
// path: /courses

router.post('/', async (req, res) => {

    const course = new Course({
        courseName: req.body.courseName,
        description: req.body.description,
        level:req.body.level,
        lessonCount:req.body.lessonCount,
        image:req.body.image,
    });
    course.save()
        .then(data => { res.json(data) })
        .catch(err => res.json({ message: err }))
});

// BULK INSERT
router.post('/bulk-insert', async (req, res) => {
    console.log(req.body.courses);
    const courses = req.body.courses.map(cat => ({
        courseName: cat.courseName,
        description: cat.description,
        level: cat.level,
        lessonCount: cat.lessonCount,
        image: cat.image,
    }));

    console.log(courses);
    Course.insertMany(courses)
        .then(data => res.json(data))
        .catch(err => res.status(400).json({ message: err }));
});


// UPDATE COURSE
// path: /courses/:id
router.patch('/:id', getCourse, async (req, res) => {

    if (req.body.courseName != null) {
        res.course.courseName = req.body.courseName;
    }
    if (req.body.description != null) {
        res.course.description = req.body.description;
    }
    if (req.body.courseId != null) {
        res.course.courseId = req.body.courseId;
    }
    if (req.body.level != null) {
        res.course.level = req.body.level;
    }
    if (req.body.lessonCount != null) {
        res.course.lessonCount = req.body.lessonCount;
    }
    if (req.body.image != null) {
        res.course.image = req.body.image;
    }
    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE COURSE
// path: /courses/:id
router.delete('/:id', getCourse, async (req, res) => {
    try {
        await res.course.deleteOne();
        res.json(res.course._id)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;