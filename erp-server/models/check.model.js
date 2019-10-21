const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
mongoose.models = {}
//models
const Bank=require('../models/bank.model');
const BankBranch=require('../models/BankBranch.model');
const BankAccount=require('../models/bankAccount.model');
const User=require('../models/User');
const CheckSchema = mongoose.Schema({

    CheckId: String,
    BankId: { type: mongoose.Schema.Types.ObjectId, ref: Bank },
    BankBranchId: { type: mongoose.Schema.Types.ObjectId, ref: BankBranch },
    BankAccountId: { type: mongoose.Schema.Types.ObjectId, ref: BankAccount },
    DateAdded: Date,
    OfCheckNumber: Number,
    ToCheckNumber: Number,
    CheckStatus: String,
    ChangeStatus: String,
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt' }
});
CheckSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
})
module.exports = mongoose.model('Check', CheckSchema);