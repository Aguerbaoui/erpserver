const Departement = require('../models/departement.model');
const Section = require('../models/section.model');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }
    const departement = new Departement(req.body);

    // Save Product in the database
    departement.save()
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
    Departement.find()
    .populate('ManagerDirectorId')
        .then(departements => {
            res.send(departements);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving    papers."
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

    const departement = new Departement(req.body);

    // Find and update product with the request body
    Departement.findByIdAndUpdate(req.body._id, departement, { new: true })
        .then(departement => {
            if (!departement) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(departement);
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
    Section.find({ 'DepartmentId': req.params._id })
        .then(result => {
            if (result.length > 0) {
                res.status(201).send({ error: "not safe" });
            } else {
                Departement.delete({
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

