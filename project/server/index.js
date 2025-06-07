import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import educationRoutes from './routes/education.js';
import experienceRoutes from './routes/experience.js';
import contactRoutes from './routes/contact.js';
import achievementRoutes from './routes/achievements.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/achievements', achievementRoutes);

// MongoDB Connection with graceful fallback
const connectDB = async () => {
  try {
    // Set connection timeout to fail faster
    const connectionOptions = {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      connectTimeoutMS: 5000,
    };
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sakshi-portfolio', connectionOptions);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.warn('MongoDB connection failed - running in development mode without database');
    console.warn('To use database features, ensure MongoDB is running on your system');
    // Don't exit the process, continue without database
  }
};

// Initialize database connection
connectDB();

app.get('/', (req, res) => {
  res.json({ 
    message: 'Sakshi Portfolio API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});