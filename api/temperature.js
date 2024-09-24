// api/temperature.js
import mongoose from 'mongoose';
import Temperature from '../models/temperature'; // Adjust the path to your schema

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

// POST and GET handler
export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { value } = req.body;
      const newTemp = new Temperature({ value });
      await newTemp.save();
      res.status(201).json(newTemp);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const temperatures = await Temperature.find().sort({ timestamp: -1 });
      res.status(200).json(temperatures);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
