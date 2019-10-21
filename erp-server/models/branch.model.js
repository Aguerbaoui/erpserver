const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
var autoIncrement = require('mongoose-auto-increment');
const Company = require('../models/company.model');
const Country= require('../models/country.model');
const Currency=require('../models/currency.model');
const User=require('../models/User');

const BranchSchema = mongoose.Schema({

    BranchId:Number,
    BranchNameAr : String,
    BranchNameEn:String,
    CompanyId: {type: mongoose.Schema.Types.ObjectId, ref: Company},
    BranchNationalityId: {type: mongoose.Schema.Types.ObjectId, ref: Country},
    CreatedDate :Date,
    HeadOffice: Boolean,
    PostalCode: String,
    Address:String,
    Phone:String,
    Mobile:String,
    Fax:String,
    Email:String,
    CurrencyId:{type: mongoose.Schema.Types.ObjectId, ref: Currency},
<<<<<<< HEAD
    BranchManagerId:{type: mongoose.Schema.Types.ObjectId, ref: User},
    ClosedBranch: {
        type: Boolean,
        default: false
      },
=======
    BranchManagerId:mongoose.Schema.Types.ObjectId,
    ClosedBranch:Boolean,
>>>>>>> 5cbc22a55a4699e7e274c86f70ad95ef73505162
    ClosedDate:Date,
    Notes:String
   
    


}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deletedAt: 'deletedAt'}
});

BranchSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })
  


/*autoIncrement.initialize(mongoose.db);
BranchSchema.plugin(autoIncrement.plugin, 'Branch');
var Branch = mongoose.model('Branch', BranchSchema);*/

module.exports = mongoose.model('Branch', BranchSchema );