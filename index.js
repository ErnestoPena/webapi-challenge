/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

*/

const express = require('express');
const server = express();
const projectRouter = require('./routes/projectRouter');
const actionRouter = require('./routes/actionRouter');
const port = 5000;

server.get('/',(req,res) => {
    res.send('<h1>This is the sprint challenge for WEB API</h1>');
})

server.use(express.json());

server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`)
})

module.exports = server;