const SupplierCustomerData = require('../models/SupplierCustomerData.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }

    // Create a Product
    const supplierCustomerData = new SupplierCustomerData(req.body);

    // Save Product in the database
    supplierCustomerData.save()
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
    SupplierCustomerData.find()
        .populate('ClassificationId')
        .then(supplierCustomerDatas => {
            res.send(supplierCustomerDatas);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving    papers."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    SupplierCustomerData.findById(req.params.supplierCustomerDataId)
        .then(supplierCustomerData => {
            if (!supplierCustomerData) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.supplierCustomerDataId
                });
            }
            res.send(SupplierCustomerData);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.supplierCustomerDataId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.supplierCustomerDataId
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
    SupplierCustomerData.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(supplierCustomerData => {
            if (!SupplierCustomerData) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(supplierCustomerData);
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
    SupplierCustomerData.delete({
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