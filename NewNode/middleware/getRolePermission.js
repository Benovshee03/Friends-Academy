const RolePermission = require('../models/rolePermission');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


async function getRolePermission(req, res, next) {


    const roleId = new ObjectId(`${req.params.id}`); 
    let rolePermission;
    try {
        rolePermission = await RolePermission.find({ roleId: roleId });
        console.log(rolePermission)
        if (rolePermission == null) {
            return res.status(404)
                .json({ message: 'RolePermission not found' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    } 
    
    res.rolePermission = rolePermission;
    next();
}

module.exports = getRolePermission; 