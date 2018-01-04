const Mongoose = require('mongoose');

let Finances = Mongoose.model('Finances', require('../models/finances'));


module.exports = {
    async getAllFinanceEntries(req, res) {
        res.send('Get all entries!');
    },
    async createFinanceEntry(req, res) {
        let entry = new Finances(req.body);
        entry.save((err, entry) => {
            if (err) res.send(err);
            res.json(entry);
        });
    },
    async getFinanceEntry(req, res) {
        res.send('Get an entry!');
    },
    async deleteFinanceEntry(req, res) {
        res.send('Delete an entry!');
    },
};
