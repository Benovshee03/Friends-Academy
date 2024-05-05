const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: false },
}, { collection: 'Permissions' });

module.exports = mongoose.model('Permission', permissionSchema);

