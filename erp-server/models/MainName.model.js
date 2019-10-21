const mongoose = require('mongoose');


const MainNameSchema = mongoose.Schema({
    
 
  MainNameAr: String,
  MainNameEn :String

}, {
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deleteAt'}
});




module.exports = mongoose.model('MainName', MainNameSchema );