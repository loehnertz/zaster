const Express = require('express');

const app = Express();


app.route('/').get((req, res) => {
    res.send(req.query);
});


module.exports = app;
