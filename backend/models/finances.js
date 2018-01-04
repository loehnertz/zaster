const Mongoose = require('mongoose');

const choices = require('./choices');


const FinancesSchema = new Mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: Object.keys(choices.types)
    },
    category: {
        type: String,
        enum: Object.keys(choices.categories)
    },
    recurring: {
        type: Boolean,
    },
    cycle: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
});


module.exports = FinancesSchema;
