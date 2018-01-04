const Mongoose = require('mongoose');

const Finances = Mongoose.model('Finances', require('../models/finances'));
const choices = require('../models/choices');
const reportTypes = require('../models/choices').report;


module.exports = {
    async calculateReport(req, res) {
        let reportType = req.params["reportType"];
        let reportTarget = req.params["reportTarget"];

        if (
            Object.keys(reportTypes).includes(req.params["reportType"]) &&
            Object.keys(reportTypes[req.params["reportType"]]).includes(reportTarget)
        ) {
            let report = {};
            for (let choice in Object.keys(choices[reportTarget])) {
                report[Object.keys(choices[reportTarget])[choice]] = 0;
            }

            Finances.find({}, (err, entries) => {
                if (err) {
                    res.send(err);
                } else {
                    for (let entry in entries) {
                        report[entries[entry][reportTarget]] += entries[entry]["amount"];
                    }
                    res.json(report);
                }
            });
        } else {
            res.sendStatus(404);
        }
    },
};
