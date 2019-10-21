var Branch = require('../models/branch.model.js');
const mongoose = require('mongoose');
const Company = require('../models/company.model.js');
const Country = require('../models/country.model.js');
const User = require('../models/User');

mongoose.models = {}

//Create new Product
exports.create = (req, res) => {
    // Request validation
    console.log(req.body.BranchNameAr)
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }
    // Create a Product
    const branch = new Branch(req.body);
    if(req.body.BranchManagerId)
    branch.BranchManagerId = req.body.BranchManagerId._id

    // Save Product in the database
    branch.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the company."
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

    console.log(req.body)
    const body = new Branch(req.body);
    // Find and update product with the request body
    Branch.findByIdAndUpdate(req.body._id, body, { new: true })
        .then(branch => {
            if (!branch) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(branch);
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


exports.remove = (req, res) => {
    User.find({ 'BranchId': req.params._id })
        .then(result => {
            if (result.length > 0) {
                res.status(201).send({ error: "not safe" });
            } else {
                Branch.delete({
                    _id: req.params._id
                })
                    .then(paper => {
                        return res.status(200).end()
                    }).catch(err => {

                        if (err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "Company not found with id " 
                            });
                        }
                        console.log(err)
                        return res.status(500).send({
                            message: "Something wrong updating note with id " 
                        });
                    })
            }
        })

}





exports.getAll = (req, res) => {
  

        Branch.aggregate([{
            $lookup: {
                from: "users", // collection name in db
                localField: "BranchManagerId",
                foreignField: "_id",
                as: "BranchManagerId"
            }
        }]).
        exec(function(err, branches) {
            if (err) console.log(err)
            Branch.populate(branches, [{path: "CurrencyId"},{path: "BranchNationalityId"}], (e,r)=>{
                res.send(r)
            });

        });
}


<<<<<<< HEAD
exports.getClosedBranchs=(req,res)=>{
    Branch.find({ClosedBranch : { $ne: false} })
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    companys."
        });
    });
=======
>>>>>>> 5cbc22a55a4699e7e274c86f70ad95ef73505162
}