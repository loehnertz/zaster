const Express = require('express');

const app = Express();
let reports = require('../controllers/reports');


app.route('/:reportType/:reportTarget')
    .get(reports.calculateReport);


module.exports = app;
