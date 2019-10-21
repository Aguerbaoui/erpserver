const Currency = require('../models/currency.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }

    // Create a Product
    const currency = new Currency(req.body);

    // Save Product in the database
    currency.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the paper."
            });
        });
};

// Retrieve all products from the database.
exports.getAll = (req, res) => {
    Currency.find()
        .then(currencys => {
            res.send(currencys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving    papers."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Currency.findById(req.params.currencyId)
        .then(currency => {
            if (!currency) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.currencyId
                });
            }
            res.send(currency);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.currencyId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.currencyId
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

    // Find and update product with the request body
    Currency.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(currency => {
            if (!currency) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(currency);
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
    Currency.delete({
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

