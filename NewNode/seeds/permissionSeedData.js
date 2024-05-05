const fs = require('fs');
const path = require('path');
const Permission = require('../models/permission');

const seedPermissions = async (mongoose) => {

    const filePath = path.join(__dirname, '../resources/permissionSeedData.json');

    await Permission.deleteMany();

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        try {
            const permissions = JSON.parse(data);
            for (const permission of permissions) {
                const newPermission = new Permission(permission);
                await newPermission.save();
            }
            console.log('Permissions have been successfully seeded.');
        } catch (error) {
            console.error("Error seeding permissions:", error);
        } finally {
        }
    });
}

module.exports = seedPermissions;   