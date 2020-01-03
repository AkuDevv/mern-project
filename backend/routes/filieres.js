const router = require('express').Router();

let Filiere = require('../models/filiere.model');

router.route('/').get((req,res)=> {
    Filiere.find()
        .then(filieres => res.json(filieres))
        .catch(err => res.status(400).json('Error : '+err));
});


router.route('/add').post((req,res)=>{
    const nom = req.body.nom;
    const subjects = req.body.subjects;

    const newFiliere = new Filiere({
        nom,
        subjects,
    });

    newFiliere.save()
        .then(()=> res.json('Filiere added!'))
        .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/:id').get((req,res)=>{
    Filiere.findById(req.params.id)
        .then(filiere=>res.json(filiere))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Filiere.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Filiere deleted!'))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res)=>{
    Filiere.findById(req.params.id)
        .then(filiere=>{
            filiere.nom = req.body.nom;
            filiere.subjects = req.body.subjects;

            filiere.save()
                .then(()=>res.json('Filiere updated!'))
                .catch(err=>res.status(400).json('Error : '+err));
        })
        .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;