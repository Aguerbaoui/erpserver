const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');

//models
const Classification=require('../models/Classification.model');
const User = require('../models/User');

mongoose.models = {}

const SupplierCustomerDataSchema = mongoose.Schema({
    
    SuppCusId : Number,
    SuppCustNameEn:String,
    SuppCustNameAr:String,
    Type:String,
    ClassificationId: {type: mongoose.Schema.Types.ObjectId, ref: Classification},
    Phones:String,
    Mobile:String,
    Fax:String,
    Email:String,
    Website:String,
    Address:String,
    Activity:String,
    StopedSuppCust : Boolean,
    StopedDate:String,
    Notes:String,
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt' }
});

SupplierCustomerDataSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })


module.exports = mongoose.model('SupplierCustomerData',  SupplierCustomerDataSchema );