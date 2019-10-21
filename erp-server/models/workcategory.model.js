const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
//models
const User=require('../models/User');
const WorkcategorySchema = mongoose.Schema({
    WorkCategoryId : Number,
    WorkCategoryNameEn : String,
    WorkCategoryNameAr : String,
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    ModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: User},
    DeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: User }


}, {
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});

WorkcategorySchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })

module.exports = mongoose.model('Workcategory', WorkcategorySchema );