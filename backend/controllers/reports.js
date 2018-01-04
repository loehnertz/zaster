const Mongoose = require('mongoose');

const Finances = Mongoose.model('Finances', require('../models/finances'));
const reportTypes = require('../models/choices').reports;


module.exports = {
    async calculateReport(req, res) {
        if (Object.keys(reportTypes).includes(req.params["reportType"])) {
            res.send(true);
        } else {
            res.sendStatus(404);
        }
    },
};
