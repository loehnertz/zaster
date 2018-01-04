const Express = require('express');

const app = Express();
const authRoutes = require('./auth');
const financeRoutes = require('./finances');
const reportRoutes = require('./reports');


//app.use('/auth', authRoutes);
app.use('/finances', financeRoutes);
app.use('/reports', reportRoutes);


module.exports = app;
