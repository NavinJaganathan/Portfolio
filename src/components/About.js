import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserCircle } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageError, setImageError] = useState(false);

  const stats = [
    { number: 3, label: 'Years Experience' },
    { number: 25, label: 'Projects Completed' },
    { number: 15, label: 'Happy Clients' },
  ];

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>
              I'm Navin, a passionate Full Stack Developer with expertise in Java, MySQL, Node.js, HTML, CSS, JavaScript, and React.
            </p>
            <p>
              I specialize in building scalable applications that combine beautiful design with robust functionality.
              My approach focuses on clean code, performance optimization, and user-centered design.
            </p>

            <div className="about-stats" ref={ref}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.h3
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    {stat.number}+
                  </motion.h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="about-avatar">
              {!imageError ? (
                <img
                  src="/navin-profile.jpg"
                  alt="Navin"
                  onError={handleImageError}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <FaUserCircle style={{
                  width: '100%',
                  height: '100%',
                  color: '#e5e7eb'
                }} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 