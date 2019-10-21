const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
const Branch= require('../models/branch.model');
const Currency=require('../models/currency.model');
const User=require('../models/User');
const Journal=require('./Journal.model');

mongoose.models = {}
const CashboxSchema = mongoose.Schema({

    CashboxId : Number,
    CashboxNameEn:String,
    CashboxNameAr:String,
    BranchId:{type: mongoose.Schema.Types.ObjectId, ref: Branch},
    CurrencyId:{type: mongoose.Schema.Types.ObjectId, ref: Currency},
    CashierId:{type: mongoose.Schema.Types.ObjectId, ref: User},
    JournalId:{type: mongoose.Schema.Types.ObjectId, ref: Journal},
    LinkingAccountsId:{type: mongoose.Schema.Types.ObjectId, ref: User},
    StopedCashbox:{
    type:Boolean,
    default:false
 },
    Notes : String,
    CreatedBy : [{type: mongoose.Schema.Types.ObjectId, ref: User}],
    ModifiedBy :[{type: mongoose.Schema.Types.ObjectId, ref: User}],
    DeletedBy :[{type: mongoose.Schema.Types.ObjectId, ref: User}]
   
    


}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt' }
});


CashboxSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })
  

module.exports = mongoose.model('Cashbox', CashboxSchema );