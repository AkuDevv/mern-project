const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    birthdate : {
        type : Date,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    tel : {
        type : Number,
        required : true
    },
    filiere : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Filiere',
        required : true
    }
},
{
    timestamps : true,
});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;