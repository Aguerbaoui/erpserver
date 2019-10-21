const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/keys');
const UserType = require('../models/UserType.model');
//authentication

exports.login = (req , res) =>{

    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) { return res.sendStatus(403); }
        user.comparePassword(req.body.password, (error, isMatch) => {
          if (!isMatch) { return res.sendStatus(403); }
          const token = jwt.sign({ user: user }, config.SECRET_TOKEN); // , { expiresIn: 10 } seconds
          res.status(200).json({ token: token });
        });
      }); 
}

//CRUD 

exports.create = (req , res)=>{
        const obj = new User(req.body);

        obj.save((err, item) => {
          // 11000 is the code for duplicate key error
          if (err && err.code === 11000) {
            res.sendStatus(400);
          }
          if (err) {
            return console.error(err);
          }
          //envoi du mail
          res.status(200).json(item);
        });
        
       
    
}

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    User.find()
    .populate('UserTypeId')
    .populate('Branches')
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving    companys."
            });
        });
};

// Update a product

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }
    const user = new User(req.body);
    // Find and update product with the request body
    User.findByIdAndUpdate(req.body._id, user, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with id "
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id "
            });
        });
};

// Delete a note with the specified noteId in the request

exports.remove = (req, res) => {

    User.delete({
        _id: req.params._id
    })
        .then(data => {
            return res.status(200).end()
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "undefined" + req.params._id
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params._id
            });
        })
    }

exports.getTypes=(req , res)=>{
    UserType.find()
    .then(types => {
        res.send(types);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    companys."
        });
    });
}



exports.getStoppedUser=(req,res)=>{
    User.find({ StopedUser: { $ne: false} })
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    companys."
        });
    });
}

exports.getStoppedDate=(req,res)=>{

    User.find({StopedDate:{$ne:false}})
    .then(users=>{
        res.send(users);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "something wrong"
        });
    });
}