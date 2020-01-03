const router = require('express').Router();

let Admin = require('../models/admin.model');

router.route('/').get((req,res)=> {
    Admin.find()
        .then(admins => res.json(admins))
        .catch(err => res.status(400).json('Error : '+err));
});


router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const newAdmin = new Admin({username,password});

    newAdmin.save()
        .then(()=>res.json('Admin Added!'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:username/:password').get((req,res)=>{
    Admin.findOne({username: req.params.username,password: req.params.password})
        .then(admins=>res.json(admins))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Admin.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Admin deleted!'))
        .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/update/:username/:password').post((req,res)=>{
    Admin.findOne({username:req.params.username,password:req.params.password})
        .then(admin=>{
            admin.username = req.body.username;
            admin.password = req.body.password;

            admin.save()
                .then(()=>res.json('Admin Updated!'))
                .catch(err=>res.status(400).json('Error: '+err));
        })
        .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;