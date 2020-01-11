const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    student : {
        type : mongoose.Schema.Types.ObjectId,
        rel : 'Student',
        required : true
    },
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        rel : 'Subject',
        required : true
    },
    note : {
        type : Number,
    }
},{
    timestamps : true,
});

const Note = mongoose.model('Note',noteSchema);

module.exports = Note;