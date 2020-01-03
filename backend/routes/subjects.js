const router = require('express').Router();

let Subject = require('../models/subject.model');

router.route('/').get((req,res)=>{
    Subject.find()
        .then(subjects=>res.json(subjects))
        .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const professor = req.body.professor;

    const newSubject = new Subject({
        name,
        professor,
    });

    newSubject.save()
        .then(()=> res.json('Subject added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Subject.findById(req.params.id)
        .then(subject=>res.json(subject))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Subject.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Subject deleted!'))
        .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/update/:id').post((req,res)=>{
    Subject.findById(req.params.id)
        .then(notes=>{
            subject.name = req.body.name;
            subject.professor = req.body.professor;

            subject.save()
                .then(()=>res.json('Subject Updated!'))
                .catch(err=>res.status(400).json('Error : '+err));
        })
        .catch(err=>res.status(400).json('Error : '+err));
});

module.exports = router;