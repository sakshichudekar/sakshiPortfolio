import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';

const router = express.Router();

// Fallback project data when database is not available
const fallbackProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
    detailedDescription: 'A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern web technologies and responsive design.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/sakshi/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.com',
    category: 'fullstack',
    featured: true,
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    detailedDescription: 'A modern task management application that allows teams to collaborate effectively. Features include real-time updates, drag-and-drop functionality, deadline tracking, and team member assignments.',
    technologies: ['React', 'Firebase', 'Material-UI'],
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/sakshi/task-manager',
    liveUrl: 'https://taskmanager-demo.com',
    category: 'web',
    featured: true,
    createdAt: new Date('2024-02-10')
  },
  {
    _id: '3',
    title: 'Weather Mobile App',
    description: 'A beautiful weather app built with React Native and Kotlin',
    detailedDescription: 'A cross-platform mobile weather application providing accurate weather forecasts, interactive maps, and location-based alerts. Features a clean, intuitive interface with smooth animations.',
    technologies: ['React Native', 'Kotlin', 'OpenWeather API'],
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/sakshi/weather-app',
    category: 'mobile',
    featured: false,
    createdAt: new Date('2024-03-05')
  },
  {
    _id: '4',
    title: 'API Gateway Service',
    description: 'A scalable API gateway built with Node.js and microservices architecture',
    detailedDescription: 'A robust API gateway service that handles authentication, rate limiting, request routing, and load balancing. Designed for high-performance microservices architecture.',
    technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/sakshi/api-gateway',
    category: 'backend',
    featured: false,
    createdAt: new Date('2024-04-12')
  },
  {
    _id: '5',
    title: 'Salesforce Integration Tool',
    description: 'Custom Salesforce integration for automated data synchronization',
    detailedDescription: 'A comprehensive Salesforce integration solution that automates data synchronization between multiple systems. Features custom workflows, real-time data validation, and error handling.',
    technologies: ['Salesforce', 'Apex', 'Lightning Web Components'],
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    githubUrl: 'https://github.com/sakshi/salesforce-integration',
    category: 'fullstack',
    featured: false,
    createdAt: new Date('2024-05-20')
  }
];

// Check if database is connected
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get all projects
router.get('/', async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.log('Database not connected, using fallback data');
      return res.json(fallbackProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to static data if database query fails
    res.json(fallbackProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.log('Database not connected, using fallback data');
      return res.json(fallbackProjects.filter(p => p.featured).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }

    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    // Fallback to static data if database query fails
    res.json(fallbackProjects.filter(p => p.featured).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      console.log('Database not connected, using fallback data');
      const project = fallbackProjects.find(p => p._id === req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.json(project);
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    // Try fallback data
    const project = fallbackProjects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  }
});

export default router;