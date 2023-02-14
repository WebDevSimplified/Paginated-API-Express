const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    hashedKey: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamp: true, _id: true, autoIndex: true  });

module.exports = mongoose.model('Api', apiSchema);