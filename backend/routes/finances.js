const Express = require('express');

const app = Express();
let finances = require('../controllers/finances');


app.route('/')
    .get(finances.getAllFinanceEntries)
    .post(finances.createFinanceEntry);

app.route('/:id')
    .get(finances.getFinanceEntry)
    .delete(finances.deleteFinanceEntry);


module.exports = app;
