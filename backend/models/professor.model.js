const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const professorSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    tel : {
        type : Number,
        required : true
    }
},{
    timestamps : true,
});

const Professor = mongoose.model('Professor',professorSchema);

module.exports = Professor;