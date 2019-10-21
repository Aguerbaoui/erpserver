const Country = require('./models/country.model.js');
const Companytype = require('./models/companytype.model.js');
const UserType = require('./models/UserType.model.js');
const Company = require('./models/company.model');
var mongoose = require('mongoose');
mongoose.models = {}

exports.config = (req, res) => {

    var countries = [
        { "CountryNameEn": "Afghanistan", "CountryNameAr": "أفغانستان" },
        { "CountryNameEn": "Åland Islands", "CountryNameAr": "AX" },
        { "CountryNameEn": "Albania", "CountryNameAr": "ألبانيا" },
        { "CountryNameEn": "Algeria", "CountryNameAr": "الجزائر" },
        { "CountryNameEn": "American Samoa", "CountryNameAr": "AS" },
        { "CountryNameEn": "AndorrA", "CountryNameAr": "AD" },
        { "CountryNameEn": "Angola", "CountryNameAr": "أنغولا" },
        { "CountryNameEn": "Anguilla", "CountryNameAr": "AI" },
        { "CountryNameEn": "Antarctica", "CountryNameAr": "AQ" },
        { "CountryNameEn": "Antigua and Barbuda", "CountryNameAr": "AG" },
        { "CountryNameEn": "Argentina", "CountryNameAr": "AR" },
        { "CountryNameEn": "Armenia", "CountryNameAr": "AM" },
        { "CountryNameEn": "Aruba", "CountryNameAr": "AW" },
        { "CountryNameEn": "Australia", "CountryNameAr": "أستراليا" },
        { "CountryNameEn": "Austria", "CountryNameAr": "AT" },
        { "CountryNameEn": "Azerbaijan", "CountryNameAr": "AZ" },
        { "CountryNameEn": "Bahamas", "CountryNameAr": "BS" },
        { "CountryNameEn": "Bahrain", "CountryNameAr": "البحرين" },
        { "CountryNameEn": "Bangladesh", "CountryNameAr": "BD" },
        { "CountryNameEn": "Barbados", "CountryNameAr": "BB" },
        { "CountryNameEn": "Belarus", "CountryNameAr": "BY" },
        { "CountryNameEn": "Belgium", "CountryNameAr": "BE" },
        { "CountryNameEn": "Belize", "CountryNameAr": "BZ" },
        { "CountryNameEn": "Benin", "CountryNameAr": "BJ" },
        { "CountryNameEn": "Bermuda", "CountryNameAr": "BM" },
        { "CountryNameEn": "Bhutan", "CountryNameAr": "BT" },
        { "CountryNameEn": "Bolivia", "CountryNameAr": "BO" },
        { "CountryNameEn": "Bosnia and Herzegovina", "CountryNameAr": "BA" },
        { "CountryNameEn": "Botswana", "CountryNameAr": "BW" },
        { "CountryNameEn": "Bouvet Island", "CountryNameAr": "BV" },
        { "CountryNameEn": "Brazil", "CountryNameAr": "البرازيل" },
        { "CountryNameEn": "British Indian Ocean Territory", "CountryNameAr": "IO" },
        { "CountryNameEn": "Brunei Darussalam", "CountryNameAr": "BN" },
        { "CountryNameEn": "Bulgaria", "CountryNameAr": "BG" },
        { "CountryNameEn": "Burkina Faso", "CountryNameAr": "BF" },
        { "CountryNameEn": "Burundi", "CountryNameAr": "BI" },
        { "CountryNameEn": "Cambodia", "CountryNameAr": "KH" },
        { "CountryNameEn": "Cameroon", "CountryNameAr": "الكمرون" },
        { "CountryNameEn": "Canada", "CountryNameAr": "كندا" },
        { "CountryNameEn": "Cape Verde", "CountryNameAr": "CV" },
        { "CountryNameEn": "Cayman Islands", "CountryNameAr": "KY" },
        { "CountryNameEn": "Central African Republic", "CountryNameAr": "CF" },
        { "CountryNameEn": "Chad", "CountryNameAr": "تشاد" },
        { "CountryNameEn": "Chile", "CountryNameAr": "CL" },
        { "CountryNameEn": "China", "CountryNameAr": "الصين" },
        { "CountryNameEn": "Christmas Island", "CountryNameAr": "CX" },
        { "CountryNameEn": "Cocos (Keeling) Islands", "CountryNameAr": "CC" },
        { "CountryNameEn": "Colombia", "CountryNameAr": "كولومبيا" },
        { "CountryNameEn": "Comoros", "CountryNameAr": "KM" },
        { "CountryNameEn": "Congo", "CountryNameAr": "الكونغو" },
        { "CountryNameEn": "Congo, The Democratic Republic of the", "CountryNameAr": "CD" },
        { "CountryNameEn": "Cook Islands", "CountryNameAr": "CK" },
        { "CountryNameEn": "Costa Rica", "CountryNameAr": "CR" },
        { "CountryNameEn": "Cote D'Ivoire", "CountryNameAr": "CI" },
        { "CountryNameEn": "Croatia", "CountryNameAr": "HR" },
        { "CountryNameEn": "Cuba", "CountryNameAr": "كوبا" },
        { "CountryNameEn": "Cyprus", "CountryNameAr": "CY" },
        { "CountryNameEn": "Czech Republic", "CountryNameAr": "CZ" },
        { "CountryNameEn": "Denmark", "CountryNameAr": "DK" },
        { "CountryNameEn": "Djibouti", "CountryNameAr": "دجيبوتي" },
        { "CountryNameEn": "Dominica", "CountryNameAr": "DM" },
        { "CountryNameEn": "Dominican Republic", "CountryNameAr": "DO" },
        { "CountryNameEn": "Ecuador", "CountryNameAr": "EC" },
        { "CountryNameEn": "Egypt", "CountryNameAr": "مصر" },
        { "CountryNameEn": "El Salvador", "CountryNameAr": "SV" },
        { "CountryNameEn": "Equatorial Guinea", "CountryNameAr": "GQ" },
        { "CountryNameEn": "Eritrea", "CountryNameAr": "ER" },
        { "CountryNameEn": "Estonia", "CountryNameAr": "EE" },
        { "CountryNameEn": "Ethiopia", "CountryNameAr": "ET" },
        { "CountryNameEn": "Falkland Islands (Malvinas)", "CountryNameAr": "FK" },
        { "CountryNameEn": "Faroe Islands", "CountryNameAr": "FO" },
        { "CountryNameEn": "Fiji", "CountryNameAr": "FJ" },
        { "CountryNameEn": "Finland", "CountryNameAr": "FI" },
        { "CountryNameEn": "France", "CountryNameAr": "فرنسا" },
        { "CountryNameEn": "French Guiana", "CountryNameAr": "GF" },
        { "CountryNameEn": "French Polynesia", "CountryNameAr": "PF" },
        { "CountryNameEn": "French Southern Territories", "CountryNameAr": "TF" },
        { "CountryNameEn": "Gabon", "CountryNameAr": "GA" },
        { "CountryNameEn": "Gambia", "CountryNameAr": "GM" },
        { "CountryNameEn": "Georgia", "CountryNameAr": "GE" },
        { "CountryNameEn": "Germany", "CountryNameAr": "DE" },
        { "CountryNameEn": "Ghana", "CountryNameAr": "GH" },
        { "CountryNameEn": "Gibraltar", "CountryNameAr": "GI" },
        { "CountryNameEn": "Greece", "CountryNameAr": "GR" },
        { "CountryNameEn": "Greenland", "CountryNameAr": "GL" },
        { "CountryNameEn": "Grenada", "CountryNameAr": "GD" },
        { "CountryNameEn": "Guadeloupe", "CountryNameAr": "GP" },
        { "CountryNameEn": "Guam", "CountryNameAr": "GU" },
        { "CountryNameEn": "Guatemala", "CountryNameAr": "GT" },
        { "CountryNameEn": "Guernsey", "CountryNameAr": "GG" },
        { "CountryNameEn": "Guinea", "CountryNameAr": "GN" },
        { "CountryNameEn": "Guinea-Bissau", "CountryNameAr": "GW" },
        { "CountryNameEn": "Guyana", "CountryNameAr": "GY" },
        { "CountryNameEn": "Haiti", "CountryNameAr": "HT" },
        { "CountryNameEn": "Heard Island and Mcdonald Islands", "CountryNameAr": "HM" },
        { "CountryNameEn": "Holy See (Vatican City State)", "CountryNameAr": "VA" },
        { "CountryNameEn": "Honduras", "CountryNameAr": "HN" },
        { "CountryNameEn": "Hong Kong", "CountryNameAr": "HK" },
        { "CountryNameEn": "Hungary", "CountryNameAr": "HU" },
        { "CountryNameEn": "Iceland", "CountryNameAr": "IS" },
        { "CountryNameEn": "India", "CountryNameAr": "IN" },
        { "CountryNameEn": "Indonesia", "CountryNameAr": "ID" },
        { "CountryNameEn": "Iran, Islamic Republic Of", "CountryNameAr": "IR" },
        { "CountryNameEn": "Iraq", "CountryNameAr": "العراق" },
        { "CountryNameEn": "Ireland", "CountryNameAr": "IE" },
        { "CountryNameEn": "Isle of Man", "CountryNameAr": "IM" },
        { "CountryNameEn": "Israel", "CountryNameAr": "IL" },
        { "CountryNameEn": "Italy", "CountryNameAr": "إيطاليا" },
        { "CountryNameEn": "Jamaica", "CountryNameAr": "JM" },
        { "CountryNameEn": "Japan", "CountryNameAr": "اليابان" },
        { "CountryNameEn": "Jersey", "CountryNameAr": "JE" },
        { "CountryNameEn": "Jordan", "CountryNameAr": "الأردن" },
        { "CountryNameEn": "Kazakhstan", "CountryNameAr": "KZ" },
        { "CountryNameEn": "Kenya", "CountryNameAr": "KE" },
        { "CountryNameEn": "Kiribati", "CountryNameAr": "KI" },
        { "CountryNameEn": "Korea, Democratic People'S Republic of", "CountryNameAr": "KP" },
        { "CountryNameEn": "Korea, Republic of", "CountryNameAr": "KR" },
        { "CountryNameEn": "Kuwait", "CountryNameAr": "كويت" },
        { "CountryNameEn": "Kyrgyzstan", "CountryNameAr": "KG" },
        { "CountryNameEn": "Lao People'S Democratic Republic", "CountryNameAr": "LA" },
        { "CountryNameEn": "Latvia", "CountryNameAr": "LV" },
        { "CountryNameEn": "Lebanon", "CountryNameAr": "LB" },
        { "CountryNameEn": "Lesotho", "CountryNameAr": "LS" },
        { "CountryNameEn": "Liberia", "CountryNameAr": "LR" },
        { "CountryNameEn": "Libyan Arab Jamahiriya", "CountryNameAr": "LY" },
        { "CountryNameEn": "Liechtenstein", "CountryNameAr": "LI" },
        { "CountryNameEn": "Lithuania", "CountryNameAr": "LT" },
        { "CountryNameEn": "Luxembourg", "CountryNameAr": "LU" },
        { "CountryNameEn": "Macao", "CountryNameAr": "MO" },
        { "CountryNameEn": "Macedonia, The Former Yugoslav Republic of", "CountryNameAr": "MK" },
        { "CountryNameEn": "Madagascar", "CountryNameAr": "MG" },
        { "CountryNameEn": "Malawi", "CountryNameAr": "MW" },
        { "CountryNameEn": "Malaysia", "CountryNameAr": "MY" },
        { "CountryNameEn": "Maldives", "CountryNameAr": "الملديف" },
        { "CountryNameEn": "Mali", "CountryNameAr": "مالي" },
        { "CountryNameEn": "Malta", "CountryNameAr": "مالطا" },
        { "CountryNameEn": "Marshall Islands", "CountryNameAr": "MH" },
        { "CountryNameEn": "Martinique", "CountryNameAr": "MQ" },
        { "CountryNameEn": "Mauritania", "CountryNameAr": "MR" },
        { "CountryNameEn": "Mauritius", "CountryNameAr": "MU" },
        { "CountryNameEn": "Mayotte", "CountryNameAr": "YT" },
        { "CountryNameEn": "Mexico", "CountryNameAr": "المكسيك" },
        { "CountryNameEn": "Micronesia, Federated States of", "CountryNameAr": "FM" },
        { "CountryNameEn": "Moldova, Republic of", "CountryNameAr": "MD" },
        { "CountryNameEn": "Monaco", "CountryNameAr": "MC" },
        { "CountryNameEn": "Mongolia", "CountryNameAr": "MN" },
        { "CountryNameEn": "Montserrat", "CountryNameAr": "MS" },
        { "CountryNameEn": "Morocco", "CountryNameAr": "المغرب" },
        { "CountryNameEn": "Mozambique", "CountryNameAr": "MZ" },
        { "CountryNameEn": "Myanmar", "CountryNameAr": "MM" },
        { "CountryNameEn": "Namibia", "CountryNameAr": "NA" },
        { "CountryNameEn": "Nauru", "CountryNameAr": "NR" },
        { "CountryNameEn": "Nepal", "CountryNameAr": "NP" },
        { "CountryNameEn": "Netherlands", "CountryNameAr": "NL" },
        { "CountryNameEn": "Netherlands Antilles", "CountryNameAr": "AN" },
        { "CountryNameEn": "New Caledonia", "CountryNameAr": "NC" },
        { "CountryNameEn": "New Zealand", "CountryNameAr": "NZ" },
        { "CountryNameEn": "Nicaragua", "CountryNameAr": "NI" },
        { "CountryNameEn": "Niger", "CountryNameAr": "النيجر" },
        { "CountryNameEn": "Nigeria", "CountryNameAr": "NG" },
        { "CountryNameEn": "Niue", "CountryNameAr": "NU" },
        { "CountryNameEn": "Norfolk Island", "CountryNameAr": "NF" },
        { "CountryNameEn": "Northern Mariana Islands", "CountryNameAr": "MP" },
        { "CountryNameEn": "Norway", "CountryNameAr": "NO" },
        { "CountryNameEn": "Oman", "CountryNameAr": "OM" },
        { "CountryNameEn": "Pakistan", "CountryNameAr": "PK" },
        { "CountryNameEn": "Palau", "CountryNameAr": "PW" },
        { "CountryNameEn": "Palestinian Territory, Occupied", "CountryNameAr": "PS" },
        { "CountryNameEn": "Panama", "CountryNameAr": "باناما" },
        { "CountryNameEn": "Papua New Guinea", "CountryNameAr": "PG" },
        { "CountryNameEn": "Paraguay", "CountryNameAr": "PY" },
        { "CountryNameEn": "Peru", "CountryNameAr": "PE" },
        { "CountryNameEn": "Philippines", "CountryNameAr": "PH" },
        { "CountryNameEn": "Pitcairn", "CountryNameAr": "PN" },
        { "CountryNameEn": "Poland", "CountryNameAr": "PL" },
        { "CountryNameEn": "Portugal", "CountryNameAr": "البرتغال" },
        { "CountryNameEn": "Puerto Rico", "CountryNameAr": "PR" },
        { "CountryNameEn": "Qatar", "CountryNameAr": "QA" },
        { "CountryNameEn": "Reunion", "CountryNameAr": "RE" },
        { "CountryNameEn": "Romania", "CountryNameAr": "RO" },
        { "CountryNameEn": "Russian Federation", "CountryNameAr": "RU" },
        { "CountryNameEn": "RWANDA", "CountryNameAr": "RW" },
        { "CountryNameEn": "Saint Helena", "CountryNameAr": "SH" },
        { "CountryNameEn": "Saint Kitts and Nevis", "CountryNameAr": "KN" },
        { "CountryNameEn": "Saint Lucia", "CountryNameAr": "LC" },
        { "CountryNameEn": "Saint Pierre and Miquelon", "CountryNameAr": "PM" },
        { "CountryNameEn": "Saint Vincent and the Grenadines", "CountryNameAr": "VC" },
        { "CountryNameEn": "Samoa", "CountryNameAr": "WS" },
        { "CountryNameEn": "San Marino", "CountryNameAr": "SM" },
        { "CountryNameEn": "Sao Tome and Principe", "CountryNameAr": "ST" },
        { "CountryNameEn": "Saudi Arabia", "CountryNameAr": "SA" },
        { "CountryNameEn": "Senegal", "CountryNameAr": "SN" },
        { "CountryNameEn": "Serbia and Montenegro", "CountryNameAr": "CS" },
        { "CountryNameEn": "Seychelles", "CountryNameAr": "SC" },
        { "CountryNameEn": "Sierra Leone", "CountryNameAr": "SL" },
        { "CountryNameEn": "Singapore", "CountryNameAr": "SG" },
        { "CountryNameEn": "Slovakia", "CountryNameAr": "SK" },
        { "CountryNameEn": "Slovenia", "CountryNameAr": "SI" },
        { "CountryNameEn": "Solomon Islands", "CountryNameAr": "SB" },
        { "CountryNameEn": "Somalia", "CountryNameAr": "SO" },
        { "CountryNameEn": "South Africa", "CountryNameAr": "ZA" },
        { "CountryNameEn": "South Georgia and the South Sandwich Islands", "CountryNameAr": "GS" },
        { "CountryNameEn": "Spain", "CountryNameAr": "ES" },
        { "CountryNameEn": "Sri Lanka", "CountryNameAr": "LK" },
        { "CountryNameEn": "Sudan", "CountryNameAr": "السودان" },
        { "CountryNameEn": "SuriCountryNameEn", "CountryNameAr": "SR" },
        { "CountryNameEn": "Svalbard and Jan Mayen", "CountryNameAr": "SJ" },
        { "CountryNameEn": "Swaziland", "CountryNameAr": "SZ" },
        { "CountryNameEn": "Sweden", "CountryNameAr": "SE" },
        { "CountryNameEn": "Switzerland", "CountryNameAr": "CH" },
        { "CountryNameEn": "Syrian Arab Republic", "CountryNameAr": "SY" },
        { "CountryNameEn": "Taiwan, Province of China", "CountryNameAr": "TW" },
        { "CountryNameEn": "Tajikistan", "CountryNameAr": "TJ" },
        { "CountryNameEn": "Tanzania, United Republic of", "CountryNameAr": "TZ" },
        { "CountryNameEn": "Thailand", "CountryNameAr": "TH" },
        { "CountryNameEn": "Timor-Leste", "CountryNameAr": "TL" },
        { "CountryNameEn": "Togo", "CountryNameAr": "TG" },
        { "CountryNameEn": "Tokelau", "CountryNameAr": "TK" },
        { "CountryNameEn": "Tonga", "CountryNameAr": "TO" },
        { "CountryNameEn": "Trinidad and Tobago", "CountryNameAr": "TT" },
        { "CountryNameEn": "Tunisia", "CountryNameAr": "تونس" },
        { "CountryNameEn": "Turkey", "CountryNameAr": "TR" },
        { "CountryNameEn": "Turkmenistan", "CountryNameAr": "TM" },
        { "CountryNameEn": "Turks and Caicos Islands", "CountryNameAr": "TC" },
        { "CountryNameEn": "Tuvalu", "CountryNameAr": "TV" },
        { "CountryNameEn": "Uganda", "CountryNameAr": "UG" },
        { "CountryNameEn": "Ukraine", "CountryNameAr": "UA" },
        { "CountryNameEn": "United Arab Emirates", "CountryNameAr": "AE" },
        { "CountryNameEn": "United Kingdom", "CountryNameAr": "GB" },
        { "CountryNameEn": "United States", "CountryNameAr": "US" },
        { "CountryNameEn": "United States Minor Outlying Islands", "CountryNameAr": "UM" },
        { "CountryNameEn": "Uruguay", "CountryNameAr": "UY" },
        { "CountryNameEn": "Uzbekistan", "CountryNameAr": "UZ" },
        { "CountryNameEn": "Vanuatu", "CountryNameAr": "VU" },
        { "CountryNameEn": "Venezuela", "CountryNameAr": "VE" },
        { "CountryNameEn": "Viet Nam", "CountryNameAr": "VN" },
        { "CountryNameEn": "Virgin Islands, British", "CountryNameAr": "VG" },
        { "CountryNameEn": "Virgin Islands, U.S.", "CountryNameAr": "VI" },
        { "CountryNameEn": "Wallis and Futuna", "CountryNameAr": "WF" },
        { "CountryNameEn": "Western Sahara", "CountryNameAr": "EH" },
        { "CountryNameEn": "Yemen", "CountryNameAr": "YE" },
        { "CountryNameEn": "Zambia", "CountryNameAr": "ZM" },
        { "CountryNameEn": "Zimbabwe", "CountryNameAr": "ZW" }
    ];
    var companyTypes = [
        new Companytype({ CompanyTypeNameAr: 'Type 1', CompanyTypeNameEn: 'Type 1' }),
        new Companytype({ CompanyTypeNameAr: 'Type 2', CompanyTypeNameEn: 'Type 2' }),
        new Companytype({ CompanyTypeNameAr: 'Type 3', CompanyTypeNameEn: 'Type 3' }),
        new Companytype({ CompanyTypeNameAr: 'Type 4', CompanyTypeNameEn: 'Type 4' })


    ];
    var userTypes = [
        new UserType({ UserTypeNameEn: 'Employee', UserTypeNameAr: 'موظف' }),
        new UserType({ UserTypeNameEn: 'Director', UserTypeNameAr: 'مدير' }),
        new UserType({ UserTypeNameEn: 'Supplier', UserTypeNameAr: 'مورد' }),
        new UserType({ UserTypeNameEn: 'Customer', UserTypeNameAr: 'عميل' }),
        new UserType({ UserTypeNameEn: 'External User', UserTypeNameAr: 'مستخدم خارجي' })

    ]

    var company = new Company({CompanyNameEn : "Focus ERP" , CompanyNameAr:"Focus ERP"});

    company.save();
    Companytype.deleteMany()
        .then(data => {
            console.log("all types are deleted");
            Companytype.insertMany(companyTypes)
                .then(data => {
                    console.log('ok')
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
    Country.deleteMany()
        .then(data => {
            console.log("all countries are deleted");
            Country.insertMany(countries)
                .then(data => {
                    console.log('ok')
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
        UserType.deleteMany()
        .then(data => {
            console.log("all user types are deleted");
            UserType.insertMany(userTypes)
                .then(data => {
                    console.log('ok')
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
    res.send("ok");

  

}


