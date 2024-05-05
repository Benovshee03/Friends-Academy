const express = require('express');
const sendMail = require('../services/mailService');
const bcrypt = require('bcryptjs');
const MailTemplate = require('../templates/mailTemplate');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const UserRole = require('../models/userRole');
const getUser = require('../middleware/getUser');
const userValidationRules = require('../validations/userValidation');
const validateUser = require('../middleware/validateUser');
const ObjectId = mongoose.Types.ObjectId;


require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', userValidationRules(), validateUser, async (req, res) => {
    try {
        const { username, password, firstname, lastname, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, firstname, lastname, email });
        await user.save();

        const template = new MailTemplate(firstname, lastname, password);
        sendMail(email, 'Hoşgeldiniz', null, template.getTemplate('register'));

        res.status(201).send({
            status: 'succeeded',
            message: 'User Created Successfully',
            content: user,
            statusCode: 201
        });
    } catch (err) {
        res.status(400).send({
            status: 'failed',
            message: err.message,
            content: err,
            statusCode: 400
        });
    }
});

// Kullanıcıya role atama
router.post('/createrole', async (req, res) => {
    try {

        const { _id, roles } = req.body;

        await UserRole.deleteMany({ userId: _id });
        await UserRole.insertMany(roles.map(roleId => ({ userId: _id, roleId: roleId })));

        const userId = new ObjectId(`${_id}`);

        const user = await User.aggregate([
            { $match: { _id: userId } },
            {
                $lookup: {
                    from: 'UserRoles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'roleDetails'
                }
            },
            {
                $unwind: '$roleDetails'
            },
            {
                $group: {
                    _id: '$roleDetails.userId',
                    roles: { $push: '$roleDetails.roleId' }
                }
            },
            {
                $project: {
                    _id: 1,
                    roles: '$roles'
                }
            }
        ]);

        res.status(201).send({
            status: 'succeeded',
            message: 'User Created Successfully',
            content: user,
            statusCode: 201
        });

    } catch (err) {
        res.status(400).send({
            status: 'failed',
            message: err.message,
            content: err,
            statusCode: 400
        });
    }
});


// Kullanıcı detaylarını getir
router.get('/getroles/:id', async (req, res) => {
    try {
        const userId = new ObjectId(`${req.params.id}`);
        const user = await User.aggregate([
            { $match: { _id: userId } },
            {
                $lookup: {
                    from: 'UserRoles',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'roleDetails'
                }
            },
            {
                $unwind: '$roleDetails'
            },
            {
                $group: {
                    _id: '$roleDetails.userId',
                    roles: { $push: '$roleDetails.roleId' }
                }
            },
            {
                $project: {
                    _id: 1,
                    roles: '$roles'
                }
            }
        ]);



        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Kullanıcı bilgilerini güncelle
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.firstname != null) {
        res.user.firstname = req.body.firstname;
    }
    if (req.body.lastname != null) {
        res.user.lastname = req.body.lastname;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Kullanıcıyı sil
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user._id);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
