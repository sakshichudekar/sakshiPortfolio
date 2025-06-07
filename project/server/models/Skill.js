import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['languages', 'web', 'database', 'tools', 'cloud', 'crm']
  },
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  icon: {
    type: String
  }
});

export default mongoose.model('Skill', skillSchema);