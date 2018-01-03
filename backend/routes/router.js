const Express = require('express');

const app = Express();
const authRoutes = require('./auth');
const financeRoutes = require('./finances');


//app.use('/auth', authRoutes);
app.use('/finances', financeRoutes);


module.exports = app;
