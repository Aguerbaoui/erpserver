const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
//models
const User=require('../models/User');
const JobSchema = mongoose.Schema({
    
  JobId : Number,
  JobNameAr: String,
  JobNameEn :String,
  JobDuties:String,
  JobCondition:String,
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }

}, {
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});


JobSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })

module.exports = mongoose.model('Job', JobSchema );