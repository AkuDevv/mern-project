const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const filiereSchema = new Schema({
    nom : {
        type : String,
        required : true
    },
    subjects : [
        {
            type : mongoose.Schema.Types.ObjectId,
            rel  : 'Subject',
            required : true
        }
    ]
},{
    timestamps : true,
});

const Filiere = mongoose.model('Filiere',filiereSchema);

module.exports = Filiere;