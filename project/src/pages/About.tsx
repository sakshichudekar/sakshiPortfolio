import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import axios from 'axios';

interface Education {
  _id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
  description: string;
  order: number;
}

interface Skills {
  [key: string]: Array<{
    _id: string;
    name: string;
    level: string;
  }>;
}

const About: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skills>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [educationRes, skillsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/education'),
          axios.get('http://localhost:5000/api/skills')
        ]);
        
        setEducation(educationRes.data);
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const skillCategories = {
    languages: 'Programming Languages',
    web: 'Web Technologies',
    database: 'Databases',
    tools: 'Tools & Platforms',
    cloud: 'Cloud Services',
    crm: 'CRM Technologies'
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-500';
      case 'advanced': return 'bg-blue-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'beginner': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I'm Sakshi Chudekar, a passionate final-year Computer Engineering student 
              with a strong foundation in full-stack development and mobile app creation. 
              I love solving complex problems and building applications that make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                My Journey
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Currently pursuing my Bachelor's degree in Computer Engineering, 
                  I've developed a strong passion for technology and innovation. 
                  My journey began with curiosity about how things work, which led 
                  me to explore programming and software development.
                </p>
                <p>
                  Through various internships and personal projects, I've gained 
                  hands-on experience in full-stack web development, Android app 
                  development, and cloud technologies. I believe in continuous 
                  learning and staying updated with the latest industry trends.
                </p>
                <p>
                  When I'm not coding, you can find me organizing technical events, 
                  participating in coding competitions, or exploring new technologies 
                  that can help solve real-world problems.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                alt="Working on projects"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-semibold">8.5 GPA</p>
                <p className="text-sm">Current Academic Performance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Education
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              My academic journey and achievements
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800"></div>

            {education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

                {/* Education Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-3">
                      <GraduationCap className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{edu.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                      {edu.grade}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Technologies I work with and my proficiency levels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, title], categoryIndex) => (
              skills[category] && (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    {title}
                  </h3>
                  <div className="space-y-3">
                    {skills[category].map((skill) => (
                      <div key={skill._id} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)} mr-2`}></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;