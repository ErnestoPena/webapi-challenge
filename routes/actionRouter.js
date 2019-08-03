const express = require('express');
const actionRouter = express.Router();

const dbActions = require('../data/helpers/actionModel');
/*We can review this code here later. I tried to import the middleware function but there was an error when trying
to module.exports from projectRouter. That is the reason I have the middleware bellow to validate the user ID before 
inserting the post. It seem that I can not export the routes and a function. I did...

module.exports = {projectRouter , verifyIdProjects} and then here I did...

const verifyIdProjects = require('./projectRouter');

but it did not work
*/

const dbProjects = require('../data/helpers/projectModel') 


//GET method to obtain all Actions
actionRouter.get('/' , async (req, res) =>{
    try {
        const allActions = await dbActions.get();
        res.status(200).json({allActions});
    }
    catch (err) {
        res.status(500).json({message: `There was a problem retreiving the records`});
    }
})


//GET method to obtain specific Actions
actionRouter.get('/:id' , verifyIdActions, async (req, res) =>{
    try {
        const allActions = await dbActions.get(req.id);
        res.status(200).json({allActions});
    }
    catch (err) {
        res.status(500).json({message: `There was a problem retreiving the records`});
    }
})

//POST method to insert a new Action
actionRouter.post('/:id/actions', verifyIdProjects, async (req,res)=>{
    try {
        const newAction = await dbActions.insert(req.body);
        res.status(200).json({newAction});
    }
    catch (err) {
        res.status(500).json({message: 'There was a problem retreiving the records'})
    }
})
















//Middlewares

//Verify Id before GET-PUT-DELETE.
async function verifyIdActions(req , res , next) {
    const verifiedId = await dbActions.get(req.params.id);
    req.id = req.params.id ;
    try {
        if (verifiedId) {
            next();
        } else {
            res.status(404).json({message: `The action with id: ${req.id} could not be found`});
        }
    }
    catch (err) {
        res.status(500).json({message: `There was a problem while trying to verify the action id. try again later or contact costumer service`});
    }
}


//Verify Id before GET-PUT-DELETE.
async function verifyIdProjects(req , res , next) {
    const verifiedId = await dbProjects.get(req.params.id);
    req.id = req.params.id ;
    try {
        if (verifiedId) {
            next();
        } else {
            res.status(404).json({message: `The project with id: ${req.id} could not be found`});
        }
    }
    catch (err) {
        res.status(500).json({message: `There was a problem while trying to verify the id. try again later or contact costumer service`});
    }
}
module.exports = actionRouter;