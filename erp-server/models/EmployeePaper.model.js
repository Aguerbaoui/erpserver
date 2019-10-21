const mongoose = require('mongoose');
const Departement = require('../models/departement.model');
const Section = require('../models/section.model');
const WorkCategory = require('../models/workcategory.model');
const Employee = require('../models/employee.model');
const Job = require('../models/job.model');
const User = require('../models/User');
const mongooseDelete =require ('mongoose-delete');

const EmployeePaperSchema = mongoose.Schema({
    PaperId : Number,
    PaperName: String,
    AddedDate : Date,
    ExpiryDate : Date,
    IsRemind: Boolean,
    RemindDate: Date,
    ReminderUserId :{type: mongoose.Schema.Types.ObjectId, ref: User},
    EmployeeId : [{ type: mongoose.Schema.Types.ObjectId, ref: Employee}],
    FileUpload: String,
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
    CreatedBy: Number,
    ModifiedBy: Number,
    DeletedBy: Number

}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
});

EmployeePaperSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })


module.exports = mongoose.model('EmployeePaper', EmployeePaperSchema);