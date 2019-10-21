const   BankBranch = require('../Models/BankBranch.model');
const   BankAccount = require('../Models/bankAccount.model');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "collection content can not be empty"
        });
    }
    const bankBranch = new BankBranch(req.body);

    // Save Product in the database
    bankBranch.save()
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
    BankBranch.find()
    .populate('BankId')
    .then(bankBranches => {
        res.send(bankBranches);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    branchs."
        });
    });
};


// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "collection content can not be empty"
        });
    }
    const bankBranch = new BankBranch(req.body);
    // Find and update product with the request body
    BankBranch.findByIdAndUpdate(req.body._id, bankBranch , {new: true})
    .then(bankBranch => {
        if(!bankBranch) {
            return res.status(404).send({
                message: "not found with id "
            });
        }
        res.send(bankBranch);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
    BankAccount.find({ 'BankBranchId': req.params._id })
    .then(result => {
        console.log(result.length)
        if (result.length > 0) {
            res.status(201).send({error : "not safe"});
        } else {
            BankBranch.delete({
                _id: req.params._id
            })
            .then(bankBranch => {
                if(!bankBranch) {
                    return res.status(404).send({
                        message: "company not found with id " + req.params._id
                    });
                }
                res.send({message: "company deleted successfully!"});
            }).catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Company not found with id " + req.params._id
                    });                
                }
                return res.status(500).send({
                    message: "Could not delete product with id " + req.params._id
                });
            });
        }

    })

  
};