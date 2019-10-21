const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
mongoose.models = {}
//models
const Currency=require('../models/currency.model');
const Bank=require('../models/bank.model');
const BankBranch=require('../models/BankBranch.model');
const Branch=require('../models/branch.model');
const User=require('../models/User');


const BankAccountSchema = mongoose.Schema({

    BankAccountId:Number,
    BankAccountNumber: Number,
    IbanNumber:Number,
    BankAccountNameEn: String,
    BankAccountNameAr: String,
    BankAccountType:String,
    BankId:{type: mongoose.Schema.Types.ObjectId, ref: Bank},
    BankBranchId: {type: mongoose.Schema.Types.ObjectId, ref: BankBranch},
    Branches:[{type: mongoose.Schema.Types.ObjectId, ref: Branch}],
    CurrencyId: {type: mongoose.Schema.Types.ObjectId, ref: Currency},
    StopedDate:Date,
    StopedBankAccount: {
        type:Boolean,
        default:false
    },
    Notes:String ,
    CreatedBy : {type: mongoose.Schema.Types.ObjectId, ref: User},
    ModifiedBy :{type: mongoose.Schema.Types.ObjectId, ref: User},
    DeletedBy :{type: mongoose.Schema.Types.ObjectId, ref: User}
}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});

BankAccountSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
})
module.exports = mongoose.model('BankAccount', BankAccountSchema );