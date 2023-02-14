const mongoose = require('mongoose');
const User = require('./users');

const tokensSchema = new mongoose.Schema({
    accessToken: { type: String, required: true },
    expires: { type: Number, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamp: true, _id: true, autoIndex: true });
  
  module.exports = mongoose.model('Token', tokensSchema)