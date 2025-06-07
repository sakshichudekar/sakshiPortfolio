import express from 'express';
import mongoose from 'mongoose';
import Education from '../models/Education.js';

const router = express.Router();

// Get all education entries
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    
    const education = await Education.find().sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;