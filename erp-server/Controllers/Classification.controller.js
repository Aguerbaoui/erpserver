const Classification = require('../models/Classification.model');
const SupplierCustomer = require('../models/SupplierCustomerData.model');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }

    // Create a Product
    const classification = new Classification(req.body);

    // Save Product in the database
    classification.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the paper."
            });
        });
};


// Find a single product with a productId
exports.findOne = (req, res) => {
    Classification.findById(req.params.classificationId)
        .then(classification => {
            if (!classification) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.classificationId
                });
            }
            res.send(Classification);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.classificationId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.classificationId
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
    Classification.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(classification => {
            if (!classification) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(classification);
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
    SupplierCustomer.find({ 'ClassificationId': req.params._id })
        .then(result => {
            if (result.length > 0) {
                res.status(201).send({ error: "not safe" });
            } else {
                Classification.delete({
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

    Classification.find({}).populate('Branches')

        .exec(function (err, data) {
            if (err) console.log(err);
            res.send(data);


        });



}