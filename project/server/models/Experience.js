import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['internship', 'fulltime', 'contract'],
    default: 'internship'
  }
});

export default mongoose.model('Experience', experienceSchema);