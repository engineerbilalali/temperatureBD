// models/temperature.js

import mongoose from 'mongoose';

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

const Temperature = mongoose.models.Temperature || mongoose.model('Temperature', temperatureSchema);
export default Temperature;
