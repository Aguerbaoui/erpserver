const mongoose = require('mongoose');
var tree = require('mongoose-data-tree');
const mongooseDelete =require ('mongoose-delete');

const CostCenterSchema = mongoose.Schema({
    CostCenterId  : Number,
    CostCenterNameEn:String,
    CostCenterNameAr:String,
    Type:String,
    ParentId: mongoose.Schema.Types.ObjectId,
    OpeningBalance:Number,
    Budget:Number,
    CloseCostCenter : Number,
    ClosingDate:Date,
    Notes:String,
    CreatedOn : { type: Date, default: Date.now },
    ModifiedOn  :{ type: Date, default: Date.now },
    DeletedOn  :{ type: Date, default: Date.now },
    CreatedBy : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    ModifiedBy :[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    DeletedBy :[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
});

CostCenterSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })





CostCenterSchema.plugin(tree);
var Account = mongoose.model('CostCenter', CostCenterSchema);
 
  

module.exports = mongoose.model('CostCenter', CostCenterSchema );