// app.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// טעינת קבצי JSON
const fs = require('fs');
const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
const authors = JSON.parse(fs.readFileSync('./authors.json', 'utf8'));
const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

app.use(express.json());

// GET endpoint לרשימת ספרים
app.get('/books', (req, res) => {
    res.json(books);
});

// GET endpoint לרשימת סופרים
app.get('/authors', (req, res) => {
    res.json(authors);
});

// GET endpoint לרשימת לקוחות
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/', (req, res)=>{
    const {name} = req.body;
    
    res.send(`Welcome ${name}`);
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);