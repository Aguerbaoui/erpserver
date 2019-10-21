const Paper = require('../models/paper.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }

    // Create a Product
    const paper = new Paper(req.body);

    // Save Product in the database
    paper.save()
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
    Paper.find()
    .populate('ReminderUserId')
    .populate('BranchId')
        .then(papers => {
            res.send(papers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving    papers."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Paper.findById(req.params.paperId)
        .then(paper => {
            if (!paper) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.paperId
                });
            }
            res.send(paper);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.paperId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.paperId
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
    Paper.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(paper => {
            if (!paper) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(paper);
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
    Paper.delete({
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

