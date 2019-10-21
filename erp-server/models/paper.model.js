
//import mongooseDelete from 
const mongooseDelete = require('mongoose-delete');
const User = require('../models/User');
const Branch = require('../models/branch.model');
//import mongoose from 'mongoose'
const mongoose = require('mongoose');
mongoose.models = {}

const PaperSchema = mongoose.Schema({


    PaperId: Number,
    PaperNameEn: String,
    PaperNameAr: String,
    AddedDate: String,
    ExpiryDate: Date,
    IsRemind: Boolean,
    RemindDate: Date,
    ReminderUserId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    FileUpload: Object,
    BranchId: { type: mongoose.Schema.Types.ObjectId, ref: Branch },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }





}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt' }
});


PaperSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
})




//export default mongoose.model('Paper', PaperSchema)


module.exports = mongoose.model('Paper', PaperSchema);