const mongoose = require('mongoose')

const definitionsSchema = new mongoose.Schema({
  category: { type: String, required: true },
  partOfSpeech: { type: String },
  title: { type: String, required: true },
  definition: { type: String, required: true },
  exampleUsage: { type: String },
  rarity: { type: String, required: true },
  spellingVariations: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamp: true, _id: true, autoIndex: true })

module.exports = mongoose.model('Definition', definitionsSchema)
