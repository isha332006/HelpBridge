const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  location: String,
  disasterType: String,
  details: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
