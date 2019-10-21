const mongoose = require('mongoose');
//const CompanyType = require('../models/companytype.model.js');
const EmployeePaper = require('../models/EmployeePaper.model');
const EmployeeJob = require('../models/EmployeeJob.model');
const Qualification = require('../models/qualification.model');
const Country = require('../models/country.model');
const mongooseDelete =require ('mongoose-delete');


const EmployeeSchema = mongoose.Schema({
    EmployeeId:Number,
    EmployeeNameAr : String,
    EmployeeNameEn :String,
    EmployeeNo : Number,
    BirthDate :Date,
    EmployeeJobId: {type: mongoose.Schema.Types.ObjectId, ref: EmployeeJob},
    EmployeePaperId: [{type: mongoose.Schema.Types.ObjectId, ref: EmployeePaper}],
    QualificationId :{type: mongoose.Schema.Types.ObjectId, ref: Qualification},
    Nationality:{type: mongoose.Schema.Types.ObjectId, ref: Country},
    Religion:String,
    SocialStatus :String,
    Gender:String,
    Phones :String,
    Mobile :String,
    Email  :String,
    Address:String,
    NumberId:Number,
    ReleaseDate :Date,
    ExpiryDate  :Date,
    StopedDate :Date,
    StopedNotes :Number
   


}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
});

EmployeeSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })

module.exports = mongoose.model('Employee', EmployeeSchema );