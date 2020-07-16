const router = require('express').Router();
let Note = require ('../models/note.model');

//List
router.route('/').get((req, res) => {
    Note.find().then(notes => res.json(notes))
    .catch(error => res.status(400).json({error}));
})

//Create
router.route('/create').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const note = new Note({title, content});

    note.save().then(() => res.json({
        message: 'Create note succsess!',
        obj: note
    })).catch(error => res.status(400).json(error));
})

//detail
router.route('/:id').get((req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        if(note != null){
            res.json({
                message : 'Get Note success!',
                obj: note
            })
        }else{
            res.status(404).json({message : 'Note not found'})
        }
    })
    .catch(error => res.status(400).json({error}));
});

//update
router.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        if(note != null){
            if(req.body.title != null) note.title = req.body.title;
            if(req.body.content != null) note.content = req.body.content;
    
            note.save().then(note => res.json({
                message: 'Update Note success!',
                obj: note
            })).catch(error => res.status(400).json({error}))
        }else{
            res.status(404).json({message : 'Note not found'})
        }
    })
    .catch(error => res.status(400).json({error}));
});

//delete
router.route('/delete/:id').delete((req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        if(note != null) {
            Note.deleteOne(note)
            .then(() => res.json({ message : 'Delete Note success!' }))
            .catch(error => res.status(400).json({error}))
        }else{
            res.status(404).json({message : 'Note not found'})
        }
    })
    .catch(error => res.status(400).json({error}));
});

module.exports = router;