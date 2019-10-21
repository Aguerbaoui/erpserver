const Section = require('../models/section.model.js');
const Departement = require('../models/departement.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }


    const section = new Section(req.body);

    // Save Product in the database
    section.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the paper."
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
    const section = new Section(req.body);
    // Find and update product with the request body
    Section.findByIdAndUpdate(req.body._id, section, { new: true })
        .then(section => {
            if (!section) {
                return res.status(404).send({
                    message: "company not found with id "
                });
            }
            res.send(section);
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
    Section.delete({
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



exports.getAll = (req, res) => {
    Section.find({}).populate('DepartmentId')
        .populate('SectionManagerId')
        .exec(function (err, data) {
            if (err) console.log(err);
            res.send(data);

        });

}

