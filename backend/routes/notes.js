const router = require('express').Router();

let Note = require('../models/note.model');

router.route('/:student').get((req,res)=> {
    Note.find({student : req.params.student})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error : '+err));
});

router.route('/findone/:student/:subject').get((req,res)=> {
    Note.findOne({student : req.params.student,subject:req.params.subject})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error : '+err));
});


router.route('/add').post((req,res)=>{
    const student = req.body.student;
    const subject = req.body.subject;
    const note = req.body.note;

    const newNote = new Note({
        student,
        subject,
        note,
    });

    newNote.save()
        .then(()=> res.json('Note added!'))
        .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/update/:student/:subject').post((req,res)=>{
    Note.findOne({student :req.params.student,subject : req.params.subject})
        .then(note=>{
            if(note !== null){
            note.note = req.body.note;

            note.save()
                .then(()=>res.json('Note updated!'))
                .catch(err=>res.status(400).json('Error : '+err));
            }
            else{
                const student = req.body.student;
                const subject = req.body.subject;
                const note = req.body.note;
            
                const newNote = new Note({
                    student,
                    subject,
                    note,
                });
            
                newNote.save()
                    .then(()=> res.json('Note added!'))
                    .catch(err=>res.status(400).json('Error : '+err));
            }
        })
        .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;