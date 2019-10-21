const mongoose = require('mongoose');
const Branch =require('../models/branch.model')
const User=require('../models/User');

const mongooseDelete =require ('mongoose-delete');
mongoose.models = {}

const JournalSchema = mongoose.Schema({
JournalTypeNameEn:String,
JournalTypeNameAr:String,
Branchs:{type: mongoose.Schema.Types.ObjectId, ref: Branch},
Users:{type: mongoose.Schema.Types.ObjectId, ref: User},
CreatedOn :Date,
ModifiedOn  :Date,
DeletedOn:Date,
CreatedBy :{type: mongoose.Schema.Types.ObjectId, ref: User},
ModifiedBy :[{type: mongoose.Schema.Types.ObjectId, ref: User}],
DeletedBy :[{type: mongoose.Schema.Types.ObjectId, ref: User}]



}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
});

JournalSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })
  

module.exports = mongoose.model('Journal', JournalSchema );