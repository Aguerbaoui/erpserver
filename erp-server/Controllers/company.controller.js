const Company = require('../models/company.model.js');
const   CompanyType  = require('../models/companytype.model.js');
const Country = require('../models/country.model.js');
const User = require('../models/User');
const Branch = require('../models/branch.model');


//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const company = new Company(req.body);

    // Save Product in the database
    company.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the company."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Company.find()
    .then(companys => {
        res.send(companys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    companys."
        });
    });
};

exports.first = (req, res) => {
    Company.find().populate('StateActivityId')
    .populate('CompanyNationalityId')
    .populate('CompanyTypeId').limit(1) //or just use findOne but it takes more time to load data
    .then(companys => {
        res.send(companys[0]);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    companys."
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
    Company.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "company not found with id " + req.params.CompanyI
            });
        }
        res.send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id "
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id "
        });
    });
};


 /**** la fonction remove */
 exports.remove = (req, res)=>{
    Branch.find({ 'CompanyId': req.params._id })
    .then(result => {
        console.log(result.length)
        if (result.length > 0) {
            res.status(201).send({error : "not safe"});
        } else {
            Company.delete({
                _id: req.params._id
              },)
          
          .then(company=>{
           return res.status(200).end()
          }).catch(err => {
             
            if(err.kind === 'ObjectId') {
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





exports.getAll=(req,res) =>{
    Company.find({})
    .populate('StateActivityId')
    .populate('CompanyNationalityId')
    .populate('ModifiedBy')
    .populate('CompanyTypeId')
    .populate('CreatedBy ')
    .exec(function(err,data){
        if(err) console.log(err);
        res.send(data);

        
    });
       
    

  }


