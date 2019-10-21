const BankAccount = require('../Models/bankAccount.model.js');
const Check = require('../Models/check.model');


//Create
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Collection content can not be empty"
        });
    }

    const bankAccount = new BankAccount(req.body);

    bankAccount.save()
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
    BankAccount.find()
    .populate('BankId')
    .populate('BankBranchId')
    .populate('CurrencyId')
    .populate('Branches')
        .then(bankAccounts => {
            res.send(bankAccounts);
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
    const bankAccount = new BankAccount(req.body);

    // Find and update product with the request body
    BankAccount.findByIdAndUpdate(req.body._id, bankAccount, { new: true })
        .then(bankAccount => {
            if (!bankAccount) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(bankAccount);
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

    Check.find({ 'BankAccountId': req.params._id })
    .then(result => {
        console.log(result.length)
        if (result.length > 0) {
            res.status(201).send({error : "not safe"});
        } else {
            BankAccount.delete({
                _id: req.params._id
            })
                .then(paper => {
                    return res.status(200).end()
                }).catch(err => {
        
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Company not found with id " + req.params._id
                        });
                    }
                    console.log(err)
                    return res.status(500).send({
                        message: "Something wrong updating note with id " + req.params._id
                    });
                })
        }
    })
    

}



exports.getStopedBankAccount=(req,res)=>{
    User.find({ StopedBankAccount: { $ne: false} })
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    companys."
        });
    });
}
