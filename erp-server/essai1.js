/*var tree = require('mongoose-data-tree');
const mongoose = require('mongoose');
//const User = require('../models/User');
 
var UserNSchema = new mongoose.Schema({
  name : String
});

UserNSchema.plugin(tree);
var UserN = mongoose.model('UserN', UserNSchema);
 
var adam = new UserN({ name : 'Adam' });
var bob = new UserN({ name : 'Bob' });
var carol = new UserN({ name : 'Carol' });
 
// Set the parent relationships
bob.parent = adam;
carol.parent = bob;
 
adam.save(function() {
  bob.save(function() {
    carol.save();
  });
});



/*
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }

    const check = new Check(req.body);

    // Save Product in the database
    console.log(check)
    check.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the company."
        });
    });
};
*/

/*

const nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b826f69c6674c1",
    pass: "61b1b6ce844156"
  }
});
const message = {
  from: 'elonmusk@tesla.com', // Sender address
  to: 'to@email.com',         // List of recipients
  subject: 'Design Your Model S | Tesla', // Subject line
  text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
};
transport.sendMail(message, function(err, info) {
  if (err) {
    console.log(err)
  } else {
    console.log(info);
  }
});

*/



var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "b826f69c6674c1",
    pass: "61b1b6ce844156"
  }
});
var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});