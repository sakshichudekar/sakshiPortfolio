import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Achievement from './models/Achievement.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sakshi-portfolio');
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Experience.deleteMany({});
    await Achievement.deleteMany({});

    // Seed Projects
    const projects = [
      {
        title: "Skin Sage App",
        description: "AI-powered skin health diagnosis application with machine learning integration",
        detailedDescription: "A comprehensive skin health application that uses machine learning to analyze skin conditions and provide personalized recommendations. Built with React for frontend, Node.js for backend, and MongoDB for data storage.",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Machine Learning", "TensorFlow"],
        image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg",
        githubUrl: "https://github.com/sakshi/skin-sage",
        category: "fullstack",
        featured: true
      },
      {
        title: "Recipe Sharing Platform",
        description: "Full-stack recipe sharing platform with image upload and user authentication",
        detailedDescription: "A social platform for food enthusiasts to share and discover recipes. Features include user authentication, image uploads, recipe categorization, and social interactions.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "JWT"],
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        githubUrl: "https://github.com/sakshi/recipe-platform",
        liveUrl: "https://recipe-platform-demo.netlify.app",
        category: "fullstack",
        featured: true
      },
      {
        title: "Weather App",
        description: "Android weather application with MVVM architecture and real-time data",
        detailedDescription: "Modern Android weather app built with Kotlin using MVVM architecture. Features real-time weather data, location-based forecasts, and clean material design interface.",
        technologies: ["Kotlin", "MVVM", "Retrofit", "Room Database", "Material Design"],
        image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
        githubUrl: "https://github.com/sakshi/weather-app",
        category: "mobile",
        featured: false
      },
      {
        title: "College Automation System",
        description: "Salesforce-based college management system with custom workflows",
        detailedDescription: "Comprehensive college management system built on Salesforce platform with custom objects, workflows, and automation for student and faculty management.",
        technologies: ["Salesforce", "Apex", "Visualforce", "Lightning Components", "SOQL"],
        image: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg",
        githubUrl: "https://github.com/sakshi/college-automation",
        category: "backend",
        featured: false
      }
    ];

    await Project.insertMany(projects);

    // Seed Skills
    const skills = [
      // Languages
      { category: 'languages', name: 'Java', level: 'advanced' },
      { category: 'languages', name: 'C++', level: 'intermediate' },
      { category: 'languages', name: 'Kotlin', level: 'intermediate' },
      { category: 'languages', name: 'JavaScript', level: 'advanced' },
      { category: 'languages', name: 'TypeScript', level: 'intermediate' },
      
      // Web Technologies
      { category: 'web', name: 'React.js', level: 'advanced' },
      { category: 'web', name: 'Node.js', level: 'advanced' },
      { category: 'web', name: 'Express.js', level: 'advanced' },
      { category: 'web', name: 'HTML5', level: 'expert' },
      { category: 'web', name: 'CSS3', level: 'advanced' },
      { category: 'web', name: 'Tailwind CSS', level: 'advanced' },
      
      // Databases
      { category: 'database', name: 'MongoDB', level: 'advanced' },
      { category: 'database', name: 'MySQL', level: 'intermediate' },
      { category: 'database', name: 'Firebase', level: 'intermediate' },
      
      // Tools
      { category: 'tools', name: 'Git & GitHub', level: 'advanced' },
      { category: 'tools', name: 'Android Studio', level: 'advanced' },
      { category: 'tools', name: 'Postman', level: 'intermediate' },
      { category: 'tools', name: 'VS Code', level: 'expert' },
      
      // Cloud
      { category: 'cloud', name: 'AWS EC2', level: 'intermediate' },
      { category: 'cloud', name: 'AWS S3', level: 'intermediate' },
      { category: 'cloud', name: 'AWS IAM', level: 'beginner' },
      
      // CRM
      { category: 'crm', name: 'Salesforce', level: 'intermediate' },
      { category: 'crm', name: 'Apex', level: 'intermediate' },
      { category: 'crm', name: 'Visualforce', level: 'beginner' },
      { category: 'crm', name: 'Lightning', level: 'beginner' }
    ];

    await Skill.insertMany(skills);

    // Seed Education
    const education = [
      {
        degree: "Bachelor of Engineering - Computer Engineering",
        institution: "Trinity College of Engineering and Research",
        year: "2025",
        grade: "8.5 GPA",
        description: "Final year student specializing in software development and computer systems",
        order: 1
      },
      {
        degree: "Diploma in Computer Engineering",
        institution: "JSPM Polytechnic",
        year: "2023",
        grade: "84.17%",
        description: "Comprehensive foundation in computer science and programming",
        order: 2
      },
      {
        degree: "Secondary School Certificate (SSC)",
        institution: "CBT Sadhana Vidyalaya",
        year: "2020",
        grade: "82.40%",
        description: "Strong academic foundation with focus on mathematics and sciences",
        order: 3
      }
    ];

    await Education.insertMany(education);

    // Seed Experience
    const experiences = [
      {
        company: "EY GDS AICTE",
        position: "Web Development Intern",
        duration: "December 2024 - April 2025",
        description: "Working on Django-based web applications with focus on backend API development. Contributing to a note-sharing application with user authentication and file management features.",
        technologies: ["Django", "Python", "REST APIs", "PostgreSQL", "Git"],
        type: "internship"
      },
      {
        company: "Pro Azure",
        position: "Android Development Intern",
        duration: "June 2022 - August 2022",
        description: "Developed mobile applications using modern Android development practices. Implemented MVVM architecture, Room database integration, and Firebase backend services.",
        technologies: ["Kotlin", "MVVM", "Room", "Firebase", "XML", "RecyclerView"],
        type: "internship"
      }
    ];

    await Experience.insertMany(experiences);

    // Seed Achievements
    const achievements = [
      {
        title: "Web Rider Competition Participant",
        description: "Participated in web development competition at PCCOE, showcasing frontend development skills",
        date: "2024",
        category: "competition"
      },
      {
        title: "Event Organizer - Coding Competition",
        description: "Organized and managed coding competitions during diploma studies, coordinating technical events",
        date: "2022",
        category: "organizing"
      },
      {
        title: "Event Organizer - Poster Making Competition",
        description: "Successfully organized poster making competitions, managing logistics and participant coordination",
        date: "2022",
        category: "organizing"
      },
      {
        title: "High Academic Performance",
        description: "Maintained consistent high grades throughout academic career with 8.5 GPA in engineering",
        date: "2021-2025",
        category: "academic"
      }
    ];

    await Achievement.insertMany(achievements);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedData();
});