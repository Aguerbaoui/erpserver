const Bank = require('../models/bank.model');
const BankAccount = require('../models/bankAccount.model');
const BankBranch = require('../models/BankBranch.model');
const Check = require('../models/check.model');

//Create  Bank
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    const bank = new Bank(req.body);

    bank.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the company."
            });
        });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Bank.find()
        .then(banks => {
            res.send(banks);
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
    const bank = new Bank(req.body);
    // Find and update product with the request body
    Bank.findByIdAndUpdate(req.body._id, bank, { new: true })
        .then(bank => {
            if (!bank) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(bank);
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
    BankBranch.find({ 'BankId': req.params._id })
        .then(result => {
            console.log(result.length)
            if (result.length > 0) {
                res.status(201).send({error : "not safe"});
            } else {
                Bank.delete({
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
        })




}
