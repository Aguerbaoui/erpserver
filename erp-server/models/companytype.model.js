
const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');

const CompanytypeSchema = mongoose.Schema({
    CompanyTypeNameAr : String,
    CompanyTypeNameEn :  String 


}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
});



CompanytypeSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })


module.exports = mongoose.model('Companytype', CompanytypeSchema );