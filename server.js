// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

const bodyParser = require('body-parser') 
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening)

function listening(){
    console.log('server running'); 
    console.log(`running on localhost: ${port} `);
}
// GET
app.get('/getData', function(req, res) {
    res.send(projectData);
});

//POST
let data = [];

app.post('/post', function(req, res){
    projectData = req.body;
    res.send(projectData);
    console.log(req.body);
})