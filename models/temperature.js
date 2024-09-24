// models/temperature.js

const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Temperature = mongoose.model('Temperature', temperatureSchema);
module.exports = Temperature;
