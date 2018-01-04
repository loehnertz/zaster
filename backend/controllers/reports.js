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
            let report = {
                label: reportTypes[reportType][reportTarget],
                labels: [],
                values: [],
                data: {}
            };

            for (let choice in Object.keys(choices[reportTarget])) {
                report["data"][Object.values(choices[reportTarget])[choice]] = 0;
            }

            Finances.find({}, (err, entries) => {
                if (err) {
                    res.send(err);
                } else {
                    for (let entry in entries) {
                        report["data"][choices[reportTarget][entries[entry][reportTarget]]] += parseInt(entries[entry]["amount"]);
                    }

                    let labels = Object.keys(report["data"]);
                    for (let label in labels) {
                        report["labels"].push(labels[label]);
                        report["values"].push(report["data"][labels[label]]);
                    }
                    delete report["data"];

                    res.json(report);
                }
            });
        } else {
            res.sendStatus(404);
        }
    },
};
