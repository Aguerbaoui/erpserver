const Check = require('../Models/check.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    const check = new Check(req.body);

    // Save Product in the database
    console.log(check)
    check.save()
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
    Check.find()
    .populate('BankId')
    .populate('BankBranchId')
    .populate('BankAccountId')
    .then(checks => {
        res.send(checks);
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
            message: "content can not be empty"
        });
    }
    const check = new Check(req.body);
    // Find and update product with the request body
    Check.findByIdAndUpdate(req.body._id, check, {new: true})
    .then(check => {
        if(!check) {
            return res.status(404).send({
                message: "not found with id "
            });
        }
        res.send(check);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "not found with id "
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id "
        });
    });
};

// Delete a note with the specified noteId in the request
exports.remove = (req, res) => {
    Check.delete({
        _id: req.params._id
      })
    .then(check => {
        if(!check) {
            return res.status(404).send({
                message: "company not found with id "
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id "
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id "
        });
    });
};