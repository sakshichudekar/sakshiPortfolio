import express from 'express';
import mongoose from 'mongoose';
import Skill from '../models/Skill.js';

const router = express.Router();

// Get all skills grouped by category
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({});
    }
    
    const skills = await Skill.find();
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    res.json(groupedSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;