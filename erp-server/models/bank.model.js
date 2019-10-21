const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
mongoose.models = {};
//models
const User=require('../models/User');
const BankSchema = mongoose.Schema({

    BankId: Number,
    BankNameEn: String,
    BankNameAr: String,
    Website: String,
    HotLine: String,
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }


}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt' }
});

BankSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
})
module.exports = mongoose.model('Bank', BankSchema);