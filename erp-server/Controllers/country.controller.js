const Country= require('../models/country.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    console.log(req.body.CountryNameAr)
    if(!req.body) {
        return res.status(400).send({
            message: "Paper content can not be empty"
        });
    }

    // Create a Product
    const country = new Country({
        CountryId: req.body.CountryId ,
        CountryNameAr: req.body.CountryNameAr ,
        CountryNameEn : req.body.CountryNameEn 
       


    });

    // Save Product in the database
    console.log(country)
    country.save()
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
    Country.find()
    .then(countrys => {
        res.send(countrys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    papers."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Country.findById(req.params.CountryId)
    .then(country => {
        if(!country) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.CountryId
            });            
        }
        res.send(country);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.CountryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.CountryId
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
    Country.findByIdAndUpdate(req.params.CountryId, {
        CountryNameAr: req.body.CountryNameAr ,
        CountryNameEn : req.body.CountryNameEn 
       

        









    }, {new: true})
    .then(country=> {
        if(!country) {
            return res.status(404).send({
                message: "company not found with id " + req.params.CountryId
            });
        }
        res.send(country);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.CountryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.CountryId
        });
    });
};

// Delete a note with the specified noteId in the request
/*exports.delete = (req, res) => {
    Country.findByIdAndRemove(req.params.CountryId)
    .then(country => {
        if(!country) {
            return res.status(404).send({
                message: " paper not found with id " + req.params.CountryId
            });
        }
        res.send({message: " paper  deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.CountryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.CountryId
        });
    });
};

*/
exports.remove = (req, res)=>{
    Country.delete({
      _id: req.params.CountryId
    },)

.then(country=>{
 return res.status(200).end()
}).catch(err => {
   
  if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.CountryId
            });                
        }
        console.log(err) 
       return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.CountryId
        });

})
    
 
}

