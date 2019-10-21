const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
var cors = require('cors');

const app = express();
app.use(cors());
//passport config
require('./config/passport')(passport);

// DB config
const db= require('./config/keys').MongoURI;
// connect to Mongo
mongoose.connect(db , { useNewUrlParser : true})
    .then(()=> console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));
   // autoIncrement.initialize(db);

//Bodyparser
app.use(bodyParser.urlencoded({
        extended: true
      }));
app.use(bodyParser.json());


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
    //Routes
app.use('/' , require('./routes/index'));
require('./routes/UserType.routes.js')(app);
require('./routes/companytype.routes.js')(app);
require('./routes/country.routes.js')(app);
require('./routes/paper.routes.js')(app);
require('./routes/branch.routes.js')(app);
require('./routes/company.routes.js')(app);
require('./routes/currency.routes.js')(app);
require('./routes/departement.routes.js')(app);
require('./routes/section.routes.js')(app);
require('./routes/workcategory.routes.js')(app);
require('./routes/job.routes.js')(app);
require('./routes/qualification.routes.js')(app);
require('./routes/employee.routes.js')(app);
require('./routes/Classification.routes.js')(app);
require('./routes/Cashbox.routes.js')(app);
require('./routes/SupplierCustomerData.routes.js')(app);
require('./routes/Journal.routes')(app);
require('./routes/bank.routes')(app);
require('./routes/bankAccount.routes')(app);
require('./routes/BankBranch.routes')(app);
require('./routes/check.routes')(app);
require('./routes/users')(app);
require('./routes/MainName.routes.js')(app);
//require('./routes/essai1.routes.js')(app);
require('./routes/account.routes.js')(app);
require('./routes/CostCenter.routes.js')(app);

app.post('/api/upload', multipartMiddleware, (req, res) => {
    var file = req.files.uploads;
    res.send(file[0])
});






const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`Server started on port ${PORT}`));