const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  filename: String,
  url: String,
  uploadedBy: String,
  createdAt: { type: Date, default: Date.now }
});

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  members: [String],
  resources: [ResourceSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);
