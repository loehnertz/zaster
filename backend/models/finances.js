const Mongoose = require('mongoose');


const FinancesSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: [{
            type: String,
            enum: ['income', 'expense']
        }]
    },
    recurring: {
        type: Boolean,
    },
    cycle: {
        type: [{
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly']
        }]
    },
});


module.exports = Mongoose.model('Finances', FinancesSchema);
