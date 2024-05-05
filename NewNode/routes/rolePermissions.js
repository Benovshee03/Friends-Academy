const express = require('express');
const router = express.Router();
const RolePermission = require('../models/rolePermission');
const getRolePermission = require('../middleware/getRolePermission');
const authenticationToken = require('../middleware/authenticationToken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


router.get('/', async (req, res) => {
    const rolePermissions = await RolePermission.aggregate([
        {
            $lookup: {
                from: "Roles",
                localField: "roleId",
                foreignField: "_id",
                as: "rolePermissionDetails"
            }
        },
        {
            $unwind: "$rolePermissionDetails"
        },
        {
            $group: {
                _id: "$roleId",
                names: { $push: "$name" },
                roleDetails: { $first: "$rolePermissionDetails" }
            }
        },
        {
            $project: {
                _id: 0,
                roleId: "$_id",
                names: 1,
            }
        }
    ]);

    res.send(rolePermissions);
});

router.get('/:id', async (req, res) => {
    const roleId = new ObjectId(`${req.params.id}`);
    const rolePermissions = await RolePermission.aggregate([
        {
            $match: {
                roleId: roleId
            },
        },
        {
            $lookup: {
                from: "Roles",
                localField: "roleId",
                foreignField: "_id",
                as: "rolePermissionDetails"
            }
        },
        {
            $unwind: "$rolePermissionDetails"
        },
        {
            $group: {
                _id: "$roleId",
                names: { $push: "$name" },
                roleDetails: { $first: "$rolePermissionDetails" }
            }
        },
        {
            $project: {
                _id: 0,
                roleId: "$_id",
                names: 1,
            }
        }
    ]);

    res.send(rolePermissions ? rolePermissions[0] : {});
});


router.post('/', async (req, res) => {
    const { roleId, userId, names } = req.body;

    if (!names || names.length === 0) {
        return res.status(400).json({ message: "Names array cannot be empty." });
    }

    try {
        await RolePermission.deleteMany({ roleId });

        const permissions = names.map(name => ({
            roleId,
            userId,
            name: name
        }));

        const insertedPermissions = await RolePermission.insertMany(permissions);

        res.json(insertedPermissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;