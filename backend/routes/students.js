const router = require('express').Router();

let Student = require('../models/student.model');

router.route('/').get((req,res)=> {
    Student.find()
        .then(students=> res.json(students))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const birthdate = Date.parse(req.body.birthdate);
    const email = req.body.email;
    const tel = Number(req.body.tel);
    const note = Number(req.body.note);
    const filiere = req.body.filiere;

    const newStudent = new Student({
        name,
        birthdate,
        email,
        tel,
        note,
        filiere,
    });

    newStudent.save()
        .then(()=> res.json('Student added!'))
        .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/:id').get((req,res)=>{
    Student.findById(req.params.id)
        .then(students=>res.json(students))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Student.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Student deleted!'))
        .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/update/:id').post((req,res)=>{
    Student.findById(req.params.id)
        .then(students=>{
            students.name = req.body.name;
            students.birthdate = req.body.birthdate;
            students.email = req.body.email;
            students.note = req.body.note;
            students.tel = req.body.tel;
            students.filiere = req.body.filiere;

            students.save()
                .then(()=>res.json('Student Updated!'))
                .catch(err=>res.status(400).json('Error : '+err));
        })
        .catch(err=>res.status(400).json('Error : '+err));
});

module.exports = router;