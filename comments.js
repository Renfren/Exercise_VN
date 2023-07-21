// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Use cors
app.use(cors());

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

// Post comment
app.post('/comments', (req, res) => {
    const newComment = {
        id: Date.now(),
        name: req.body.name,
        comment: req.body.comment
    };

    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) throw err;

        const comments = JSON.parse(data);
        comments.push(newComment);

        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.send(newComment);
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
});