const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CollectionSchema = new mongoose.Schema({
    collectionName : {
        type : String,
        required: true
    }
});

const Collection = mongoose.model('Collection' , CollectionSchema);

module.exports = Collection;
