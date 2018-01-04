const Express = require('express');

const app = Express();
let reports = require('../controllers/reports');


app.route('/').get(reports);


module.exports = app;
