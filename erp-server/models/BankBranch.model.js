const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
mongoose.models = {};
//models
const Bank=require('../models/bank.model');
const User=require('../models/User');
const BankBranchSchema = mongoose.Schema({
    
    BankBranchId : Number,
    BankBranchNameAr : String,
    BankBranchNameEn:String,
    BankId:{type: mongoose.Schema.Types.ObjectId, ref: Bank},  
    Phones:String,
    Address:String,
    CreatedBy :{type: mongoose.Schema.Types.ObjectId, ref: User},
    ModifiedBy :{type: mongoose.Schema.Types.ObjectId, ref: User},
    DeletedBy :{type: mongoose.Schema.Types.ObjectId, ref: User}
}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});
BankBranchSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
})
module.exports = mongoose.model('BankBranch', BankBranchSchema );