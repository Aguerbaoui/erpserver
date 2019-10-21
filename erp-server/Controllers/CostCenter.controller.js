const CostCenter = require('../models/CostCenter.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    console.log(req.body.CostCenterNameEn  )
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const costCenter = new CostCenter(req.body);

    // Save Product in the database
    console.log(costCenter)
    costCenter.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the company."
        });
    });
};


// Find a single product with a productId
exports.findOne = (req, res) => {
    CostCenter.findById(req.params.costCenterId)
    .then(costCenter => {
        if(!costCenter) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.costCenterId
            });            
        }
        res.send(costCenter);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.costCenterId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.costCenterId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    CostCenter.findByIdAndUpdate(req.params.costCenterId,req.body, {new: true})
    .then(costCenter => {
        if(!costCenter) {
            return res.status(404).send({
                message: "company not found with id " + req.params.costCenterId
            });
        }
        res.send(costCenter);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.costCenterId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.costCenterId
        });
    });
};













exports.getAll = (req, res) => {
    CostCenter.aggregate([{
        $lookup: {
            from: "costcenters", // collection name in db
            localField: "ParentId",
            foreignField: "costCenterId",
            as: "ParentId"
        }
    }]) 
.exec(function(err, accounts) {
        if (err) console.log(err)
        res.send(accounts);

    });

};



exports.remove = (req, res) => {
    CostCenter.delete({
        _id: req.params.costCenterId
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


