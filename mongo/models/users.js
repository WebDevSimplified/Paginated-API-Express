const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'client' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamp: true, _id: true, autoIndex: true })

module.exports = mongoose.model('User', usersSchema)