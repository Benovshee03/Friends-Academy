const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: false },
}, { collection: 'RolePermissions' });

module.exports = mongoose.model('RolePermission', rolePermissionSchema);
