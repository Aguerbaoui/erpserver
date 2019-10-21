const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
//models
const User = require('../models/User');
const Branch = require('../models/branch.model');


mongoose.models = {}
const CurrencySchema = mongoose.Schema({

  CurrencyId: Number,
  CurrencyNameEn: String,
  CurrencyNameAr: String,
  CurrencySymbolEn: String,
  CurrencySymbolAr: String,
  MainCurrency: Boolean,
  Branches: [{ type: mongoose.Schema.Types.ObjectId, ref: Branch }],
  LastExchangeRate: String,
  DateOfPrice: Date





}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt' }
});


CurrencySchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
  deletedBy: true
})



module.exports = mongoose.model('Currency', CurrencySchema);