const Companytype = require('../models/companytype.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    console.log(req.body. CompanyTypeNameEn)
    if(!req.body) {
        return res.status(400).send({
            message: "workcategory content can not be empty"
        });
    }

    // Create a Product
    const companytype = new Companytype({
        CompanyTypeNameAr:req.body. CompanyTypeNameAr,
        CompanyTypeNameEn: req.body.CompanyTypeNameEn 
       




    });

    // Save Product in the database
    console.log(companytype)
    companytype.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the workcategory."
        });
    });
};

// Retrieve all products from the database.
exports.getAll = (req, res) => {
    Companytype.find()
    .then(companytypes => {
        res.send(companytypes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    workcategorys ."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Companytype.findById(req.params.companytypeId)
    .then(companytype => {
        if(!companytype) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.companytypeId
            });            
        }
        res.send(companytype);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.companytypeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.companytypeId
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
    Companytype.findByIdAndUpdate(req.params.companytypeId, {
       
        CompanyTypeNameAr:req.body. CompanyTypeNameAr,
        CompanyTypeNameEn: req.body.CompanyTypeNameEn ,
       

    }, {new: true})
    .then(companytype => {
        if(!companytype) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companytypeId
            });
        }
        res.send(companytype);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companytypeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.companytypeId
        });
    });
};

// Delete a note with the specified noteId in the request
/*exports.delete = (req, res) => {
    Companytype.findByIdAndRemove(req.params.companytypeId)
    .then(companytype=> {
        if(!companytype) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companytypeId
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companytypeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.companytypeId
        });
    });
};*/



 /**** la fonction remove */
 exports.remove = (req, res)=>{
    Companytype.delete({
      _id: req.params.companytypeId
    },)

.then(companytype=>{
 return res.status(200).end()
}).catch(err => {
   
  if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companytypeId
            });                
        }
        console.log(err) 
       return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.companytypeId
        });

})
   
   
 
}
