//create a web server
//create a route to /comments
//send back a json object with some comments and a status code of 200

//import express
const express = require('express');
//create a new express app
const app = express();
//import the comments data
const comments = require('./data/comments');
//create a route to /comments
app.get('/comments', (req, res) => {
    //send back a json object with some comments and a status code of 200
    res.status(200).json({ comments: comments });
});
//listen on port 3000
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});