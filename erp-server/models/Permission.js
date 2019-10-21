const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PermissionSchema = new mongoose.Schema({
    print : {
        type : Boolean,
    },
    delete : {
        type : Boolean,
    },
    edit : {
        type : Boolean,
    },
    save : {
        type : Boolean,
    },
    view : {
        type : Boolean,
    },
    collectionId : {
        type : String,
    },
    userId : {
        type : String,
    }
});

const Permission = mongoose.model('Permission' , PermissionSchema);

module.exports = Permission;
