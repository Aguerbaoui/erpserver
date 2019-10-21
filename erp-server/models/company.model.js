const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
//delete
const Companytype =require('../models/companytype.model')
const Country =require('../models/country.model')
const User=require('../models/User');

mongoose.models = {}
const CompanySchema = mongoose.Schema({
   
    CompanyId : Number,
    CompanyNameAr : String,
    CompanyNameEn :String,
    CompanyTypeId: {type: mongoose.Schema.Types.ObjectId, ref: Companytype},
    CreatedDate :Date,
    StateActivityId  :{type: mongoose.Schema.Types.ObjectId, ref: Country},
    CompanyNationalityId :{type: mongoose.Schema.Types.ObjectId, ref: Country},
    Website : String,
    CommercialRegister :String,
    TaxNumber   :String,
    NumberFacility :String,
    MembershipNumber :String,
    CompanyLogo  :String,
    Header :String,
    Footer :String

}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt'}
});

CompanySchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })

module.exports = mongoose.model('Company', CompanySchema );