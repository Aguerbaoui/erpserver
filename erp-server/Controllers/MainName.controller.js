
const MainName = require('../models/MainName.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }


    const mainName = new MainName(req.body);

    // Save Product in the database
    mainName.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the paper."
            });
        });
};


exports.getAll = (req, res) => {
    MainName.find()
    .then(mainNames => {
        res.send(mainNames);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    papers."
        });
    });
};
