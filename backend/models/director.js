const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: String,
    age: Number
});

// mongoose pluralizes Director into directors
// Director refers to the directors collection in the database

module.exports = mongoose.model('Director', directorSchema);
