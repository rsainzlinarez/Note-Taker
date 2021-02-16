const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const generateUniqueId = require('generate-unique-id');


// Sets the initial port
const PORT = process.env.port || 3000;


// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Method handles html notes file requests
app.get('/',   (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    // console.log(res.sendFile(path.join(__dirname, '/public/index.html')));
    });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    });


// Gets the aip notes from the json db file
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
    
    });  


// Module exports api routes with requests and posts from and to db.json file
app.post('/api/notes/', (req, res) =>{
  
    const newNote ={
        title: req.body.title,
        text: req.body.text,
        id: generateUniqueId({
            length: 10,
            useLetters: true,
            useNumbers: true
        })
        };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let note = JSON.parse(data);
        console.log(note);
        note.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(note), err =>{
        if(err){
        console.log(err)
            }
        });
        res.send(newNote);
   });
        });

// Listens for Port
app.listen(PORT, () =>{
    console.log(`Port listening on: localhost:${PORT}`);
});

