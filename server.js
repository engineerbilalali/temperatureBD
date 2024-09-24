// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Temperature = require('./models/temperature');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// POST Route to Store Temperature
app.post('/temperature', async (req, res) => {
  try {
    const { value } = req.body;
    const newTemp = new Temperature({ value });
    await newTemp.save();
    res.status(201).send(newTemp);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET Route to Retrieve All Temperatures
app.get('/temperature', async (req, res) => {
  try {
    const temperatures = await Temperature.find().sort({ timestamp: -1 });
    res.status(200).json(temperatures);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
