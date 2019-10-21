const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
//models
const User=require('../models/User');
const DepartementSchema = mongoose.Schema({
    
  DepartmentId : Number,
  DepartmentNameEn: String,
  DepartmentNameAr :String,
  ManagerDirectorId: { type: mongoose.Schema.Types.ObjectId, ref: User},
  CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
  DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }
   
}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});


DepartementSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })


module.exports = mongoose.model('Departement', DepartementSchema );