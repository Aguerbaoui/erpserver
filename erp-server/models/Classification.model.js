
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

//models
const Branch = require('../models/branch.model');
const User = require('../models/User');



const ClassificationSchema = mongoose.Schema({

    ClassificationId: Number,
    ClassificationNameEn: String,
    ClassificationNameAr: String,
    Type: String,
    LinkingAccountId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    MainClassification: Boolean,
    Branches: [{ type: mongoose.Schema.Types.ObjectId, ref: Branch }],
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }

}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt' }
});


ClassificationSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
})


module.exports = mongoose.model('Classification', ClassificationSchema);