const mongoose = require('mongoose');

const UserTypeSchema = mongoose.Schema({
    BranchTypeId: Number,
    UserTypeNameEn: String,
    UserTypeNameAr: String
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at' }
});

module.exports = mongoose.model('Usertype', UserTypeSchema);