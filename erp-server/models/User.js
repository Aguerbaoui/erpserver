const mongoose = require('mongoose');
const mongooseDelete =require ('mongoose-delete');
const bcrypt = require('bcryptjs');
const UserType = require('../models/UserType.model');
const Branch = require('../models/branch.model')

var UserSchema = new mongoose.Schema({
    UserNameEn : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    role : {
        type : String
    },
    UserNameAr: String,
    Branches : [{type: mongoose.Schema.Types.ObjectId, ref: Branch}],
    UserTypeId : {type: mongoose.Schema.Types.ObjectId, ref: UserType},
    UserLinkId : {},
    Mobile : String,
    StopedUser : {
      type: Boolean,
      default: false
    },
      
    StopedDate : Date,
    Notes : String
   
},{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deleteAt: 'deletedAt' }
});

  
  // Before saving the user, hash the password
  UserSchema.pre('save', function(next) {
    const user = this;
    user.role = 'user';
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, function(error, hash) {
        if (error) { return next(error); }
        user.password = hash;
        next();
      });
    });
  });
  
  UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) { return callback(err); }
      callback(null, isMatch);
    });
  };
  
  // Omit the password when returning a user
  UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
      delete ret.password;
      return ret;
    }
  });
  


  UserSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true
  })
  


const User = mongoose.model('User' , UserSchema);

module.exports = User;