const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
//models
const User=require('../models/User');

const QualificationSchema = mongoose.Schema({
  QualificationId : Number,
  QualificationNameEn: String,
  QualificationNameAr :String,
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }

}, {
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});

QualificationSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })
  

module.exports = mongoose.model('Qualification', QualificationSchema );