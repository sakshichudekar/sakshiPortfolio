import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['competition', 'certification', 'organizing', 'academic'],
    required: true
  },
  icon: {
    type: String
  }
});

export default mongoose.model('Achievement', achievementSchema);