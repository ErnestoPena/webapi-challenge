const express = require('express');
const dbProjects = require('../data/helpers/projectModel')
const projectRouter = express.Router();

//GET to pull all projects from database
projectRouter.get('/', async (req,res) => {
    try {
        const allProjects = await dbProjects.get();
        res.status(200).json({allProjects});
    }
    catch (err) {
        res.status(500).json({message: `There was a problem with the ${req.method} method`, err});
    }
})

//GET for an specific ID
projectRouter.get('/:id' , verifyId , async (req , res) =>{
    
    try {
        const projectId = await dbProjects.get(req.id);
        console.log(projectId);
        res.status(200).json({projectId});
    }
    catch (err) {
        res.status(500).json({message: `There was a problem with the ${req.method} method`, err});
    }
})

//INSERT method for projects
projectRouter.post('/', async (req,res) => {
    try {
        const projectObject = await dbProjects.insert(req.body);
        res.status(202).json({projectObject});
    }
    catch (err) {
        res.status(500).json({message: `There was a problem with the ${req.method} method`});
    }
})

//PUT method for projects
projectRouter.put('/:id' , verifyId ,async (req,res) => {
    try {
        const myUpdatedProject = await dbProjects.update(req.id , req.body);
        res.status(200).json({message: `The project ${myUpdatedProject.name} has been audated`});
    }
    catch (err) {
        res.status(500).json({message: `There was a problem with the ${re.method} method`});
    }
})

//DELETE method for projects
projectRouter.delete('/:id' , verifyId , async (req , res) => {
    try {
        const deletedProjectHolder = await dbProjects.get(req.id);
        const deletedProject = await dbProjects.remove(req.id);
        res.status(200).json({message: `The project with the id: ${deletedProjectHolder.id} and name: ${deletedProjectHolder.name} has been deleted`})
    }
    catch (err) {
        res.status(500).json({message: `There was a problem with the ${req.method} method`});
    }
})

//Extra method to list all actions of a single project
projectRouter.get('/:id/actions' , verifyId, async (req,res) =>{
    try {
        const actionByProjects = await dbProjects.getProjectActions(req.id);
        res.status(200).json({actionByProjects})
    }
    catch (err) {
        res.status(500).json({message: `The was a problem with the ${req.method} method when requesting all actions with the project id: ${req.id}`});
    }
})


//Middlewares

//Verify Id before GET-PUT-DELETE.
async function verifyId(req , res , next) {
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


module.exports = projectRouter;