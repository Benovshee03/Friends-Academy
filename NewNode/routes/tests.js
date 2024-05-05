const express = require('express');
const router = express.Router();
const Test = require('../models/test');
const getTest = require('../middleware/getTest');
const authenticationToken = require('../middleware/authenticationToken');

// GET ALL TEST
// path: /tests
router.get('/', async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET TEST BY ID
// path: /tests/:1

router.get('/:id', getTest, async (req, res) => {
    res.send(res.test);
});


// ADD NEW TEST
// path: /tests

router.post('/', async (req, res) => {

    const test = new Test({
        question: req.body.question,
        image: req.body.image,
        category:req.body.category,
        correctAnswer:req.body.correctAnswer,
        first:req.body.first,
        second:req.body.second,
        third:req.body.third,
    });
    test.save()
        .then(data => { res.json(data) })
        .catch(err => res.json({ message: err }))
});

// BULK INSERT
router.post('/bulk-insert', async (req, res) => {
    console.log(req.body.tests);
    const tests = req.body.tests.map(cat => ({
        question: cat.question,
        image: cat.description,
        category:cat.category,
        correctAnswer:cat.correctAnswer,
        first:cat.first,
        second:cat.second,
        third:cat.third,
    }));

    console.log(tests);
    Course.insertMany(tests)
        .then(data => res.json(data))
        .catch(err => res.status(400).json({ message: err }));
});


// UPDATE TEST
// path: /tests/:id
router.patch('/:id', getTest, async (req, res) => {
    if (req.req.body.question != null) {
        res.test.question = req.req.body.question;
    }
    if (req.body.image != null) {
        res.test.image = req.body.image;
    }
    if (req.body.testId != null) {
        res.test.testId = req.body.testId;
    }
    if (req.body.category != null) {
        res.test.category = req.body.category;
    }
    if (req.body.correctAnswer != null) {
        res.test.correctAnswer = req.body.correctAnswer;
    }
    if (req.body.first != null) {
        res.test.first = req.body.first;
    }
    if (req.body.second != null) {
        res.test.second = req.body.second;
    }
    if (req.body.third != null) {
        res.test.third = req.body.third;
    }
    try {
        const updatedTest = await res.test.save();
        res.json(updatedTest);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE TEST
// path: /tests/:id
router.delete('/:id', getTest, async (req, res) => {
    try {
        await res.test.deleteOne();
        res.json(res.test._id)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;