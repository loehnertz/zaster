const Mongoose = require('mongoose');

const Finances = Mongoose.model('Finances', require('../models/finances'));


module.exports = {
    async getAllFinanceEntries(req, res) {
        Finances.find({}, (err, entry) => {
            if (err) res.send(err);
            res.json(entry);
        });
    },
    async createFinanceEntry(req, res) {
        let newEntry = new Finances(req.body);
        newEntry.save((err, entry) => {
            if (err) res.send(err);
            res.json(entry);
        });
    },
    async getFinanceEntry(req, res) {
        Finances.findById(req.params.id, (err, entry) => {
            if (err) res.send(err);
            res.json(entry);
        });
    },
    async deleteFinanceEntry(req, res) {
        res.send('Delete an entry!');
    },
};
