const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
/*const Company = require('../models/company.model');
const CompanyType =require('../models/companytype.model')*/
mongoose.models = {}

const CountrySchema = mongoose.Schema({
    
CountryId:Number,
CountryNameAr: String,
CountryNameEn :String
   
    


}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
});


CountrySchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })

module.exports = mongoose.model('Country', CountrySchema );