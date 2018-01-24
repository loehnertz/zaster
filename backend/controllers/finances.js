const Mongoose = require('mongoose');

const Finances = Mongoose.model('Finances', require('../models/finances'));


module.exports = {
    getAllFinanceEntries(req, res) {
        Finances.find({}, (err, entries) => {
            if (err) res.send(err);
            res.json(entries);
        });
    },
    createFinanceEntry(req, res) {
        let newEntry = new Finances(req.body);
        newEntry.save((err, entry) => {
            if (err) res.send(err);
            res.json(entry);
        });
    },
    getFinanceEntry(req, res) {
        Finances.findById(req.params.id, (err, entry) => {
            if (err) res.send(err);
            res.json(entry);
        });
    },
    deleteFinanceEntry(req, res) {
        Finances.remove({_id: req.params.id}, (err) => {
            if (err) res.send(err);
            res.json(true);
        });
    },
    getAllFinanceChoices(req, res) {
        res.json(require('../models/choices'));
    },
};
