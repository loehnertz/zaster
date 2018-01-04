const Mongoose = require('mongoose');


module.exports = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['income', 'expense']
    },
    recurring: {
        type: Boolean,
    },
    cycle: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
});
