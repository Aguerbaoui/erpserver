const mongoose = require('mongoose');
const Departement = require('../models/departement.model');
const Section = require('../models/section.model');
const WorkCategory = require('../models/workcategory.model');
const Employee = require('../models/employee.model');
const Job = require('../models/job.model');
const mongooseDelete =require ('mongoose-delete');

const EmployeeJobSchema = mongoose.Schema({
    BranchId : Number,
    DepartmentId:{type: mongoose.Schema.Types.ObjectId, ref: Departement},
    SectionId :{type: mongoose.Schema.Types.ObjectId, ref: Section},
    WorkCategoryId :{ type: mongoose.Schema.Types.ObjectId, ref: WorkCategory},
    JobId :{type: mongoose.Schema.Types.ObjectId, ref: Job},
 
    JobTitle : String,
    DesignationDate : Date
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
});
EmployeeJobSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })
module.exports = mongoose.model('EmployeeJob', EmployeeJobSchema );