const Express = require('express');

const app = Express();


app.route('/finances/:id')
    .get((req, res) => {
        res.send('Get an entry');
    })
    .post((req, res) => {
        res.send('Add an entry');
    })
    .put((req, res) => {
        res.send('Update an entry');
    });


module.exports = app;
