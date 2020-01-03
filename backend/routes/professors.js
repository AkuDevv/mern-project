const router = require('express').Router();

let Professor = require('../models/professor.model');

router.route('/').get((req,res)=>{
    Professor.find()
        .then(professors => res.json(professors))
        .catch(err => res.status(400).json('Error : '+err));
});

router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const tel = Number(req.body.tel);

    const newProfessor = new Professor({
        name,
        email,
        tel,
    });

    newProfessor.save()
        .then(()=>res.json('Professor added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Professor.findById(req.params.id)
        .then(professors=>res.json(professors))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Professor.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Professor deleted!'))
        .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/update/:id').post((req,res)=>{
    Professor.findById(req.params.id)
        .then(professors=>{
            professors.name = req.body.name;
            professors.email = req.body.email;
            professors.tel = req.body.tel;

            professors.save()
                .then(()=>res.json('Professor Updated!'))
                .catch(err=>res.status(400).json('Error : '+err));
        })
        .catch(err=>res.status(400).json('Error : '+err));
});

module.exports = router;

