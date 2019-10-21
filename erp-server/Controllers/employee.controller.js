const Employee = require('../models/employee.model.js');
const EmployeeJob = require('../models/EmployeeJob.model');
const EmployeePaper = require('../models/EmployeePaper.model');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    console.log(req.body.EmployeeNameAr)
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const employee = new Employee(req.body.employee);
    const job = new EmployeeJob(req.body.job);
    const papers = req.body.papers;

    job.save()
        .then(data => {
            console.log(data)
            employee.EmployeeJobId = data._id;
            EmployeePaper.insertMany(papers)
                .then(result => {
                    console.log(result)
                    employee.EmployeePaperId = result;
                    employee.save()
                        .then(ress => {
                            res.send(ress);
                        })
                })
        })
   
};


// Find a single product with a productId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.employeeId
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
    req.body.employee

    // Find and update product with the request body
    Employee.findByIdAndUpdate(req.body.employee)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "company not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.employeeId
            });
        });
};

exports.remove = (req, res) => {
    //  console.log(req.params.EmployeeId)

    Employee.find({ _id: req.params.EmployeeId })
        .then(data => {
            console.log(data[0].EmployeeJobId);
            EmployeeJob.delete({ _id: data[0].EmployeeJobId })
                .then(r1 => {
                    console.log("deleted")
                    EmployeePaper.delete({_id: { $in: data[0].EmployeePaperId}})
                        .then(r2 => {
                            console.log("papers deleted")
                            Employee.delete({ _id: req.params.EmployeeId })
                                .then(ress => {
                                    res.send("ok")
                                })
                        })
                })


        })
    
}



exports.getAll = (req, res) => {
    console.log("test")
    Employee.find({})
        .populate('QualificationId')
        .populate('EmployeeJobId')
        .populate('EmployeePaperId')
        .populate('Nationality')

        .exec(function (err, data) {
            if (err) console.log(err);
            res.send(data);
        });
}