const Express = require('express');

const app = Express();


app.route('/')
    .get((req, res) => {
        res.send('Get all entries');
    })
    .post((req, res) => {
        res.send('Add an entry');
    });

app.route('/:id')
    .get((req, res) => {
        res.send('Get an entry');
    })
    .delete((req, res) => {
        res.send('Update an entry');
    });


module.exports = app;
