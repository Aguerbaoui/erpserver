const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');

//models
const Departement =require('../models/departement.model')
const User=require('../models/User');

const SectionSchema = mongoose.Schema({
    
  SectionId : Number,
  SectionNameEn: String,
  SectionNameAr:String,
  SectionManagerId:{ type: mongoose.Schema.Types.ObjectId, ref: User},
  DepartmentId:{type: mongoose.Schema.Types.ObjectId, ref: Departement},
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }
   
    


}, {
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});


SectionSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })

module.exports = mongoose.model('Section', SectionSchema );