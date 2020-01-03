const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    professor : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Professor',
        required : true,

    }
},{
    timestamps : true,
});


const Subject = mongoose.model('Subject',subjectSchema);

module.exports = Subject;
