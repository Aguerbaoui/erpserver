const Account = require('../models/account.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    console.log(req.body.AccountNameAr)
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const account = new Account(req.body);
    var finalAccount = new Account({ Type : 'FinalAccount' });
    var analyticalAccount = new Account({ Type : 'AnalyticalAccount' });
    
    // Set the parent relationships
    finalAccount.parent =basicAcount = new Account({ Type : 'BasicAccount' });
    analyticalAccount.parent = finalAccount ;
    //analyticalAccount.parent = analyticalAccount;
    
    basicAcount.save(function() {
       finalAccount.save(function() {
           analyticalAccount .save();
     });
    });


    // Save Product in the database
    console.log(account)
    account.save()
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
    Account.findById(req.params.accountId)
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.accountId
            });            
        }
        res.send(account);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.accountId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.accountId
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
    Account.findByIdAndUpdate(req.params.accountId,req.body, {new: true})
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "company not found with id " + req.params.accountId
            });
        }
        res.send(account);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.accountId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.accountId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.remove = (req, res)=>{
    Account.delete({
      _id: req.params.accountId
    },)
.then(account=>{
 return res.status(200).end()
}).catch(err => {
   
  if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.accountId
            });                
        }
        console.log(err) 
       return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.accountId
        });
})
 
}





exports.getAll = (req, res) => {
    Account.aggregate([{
        $lookup: {
            from: "accounts", // collection name in db
            localField: "ParentId",
            foreignField: "accountId",
            as: "ParentId"
        }
    }]) 
.exec(function(err, accounts) {
        if (err) console.log(err)
        res.send(accounts);

    });

};

exports.getStopedAccount=(req,res)=>{
    Account.find({  StopedAccount: { $ne: false} })
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving    companys."
        });
    });
}


