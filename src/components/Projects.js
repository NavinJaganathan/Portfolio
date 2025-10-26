import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  FaMobileAlt, FaChartLine, FaExternalLinkAlt, FaGithub ,FaJava} from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const projects = [
        {
            id: 1,
            title: 'Student Management System',
            description: 'Console-based application with JDBC MySQL connection for managing student records, grades, and attendance. Features CRUD operations, data validation, and secure database interactions.',
            icon: FaJava,
            technologies: ['Java', 'MySQL', 'JDBC'],
            demoLink: '#',
            codeLink: '#'
        },
        // {
        //     id: 2,
        //     title: 'Task Management App',
        //     description: 'A responsive task management application with real-time updates, drag-and-drop functionality, and team collaboration.',
        //     icon: FaMobileAlt,
        //     technologies: ['Vue.js', 'Firebase', 'CSS3'],
        //     demoLink: '#',
        //     codeLink: '#'
        // },
        // {
        //     id: 3,
        //     title: 'Data Analytics Dashboard',
        //     description: 'Interactive dashboard for data visualization with real-time charts, filters, and export capabilities.',
        //     icon: FaChartLine,
        //     technologies: ['Angular', 'D3.js', 'Python'],
        //     demoLink: '#',
        //     codeLink: '#'
        // }
    ];

    const containerVariants = { 
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="projects" className="projects">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Featured Projects
                </motion.h2>

                <motion.div
                    className="projects-grid"
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            variants={cardVariants}
                            whileHover={{
                                y: -15,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="project-image">
                                <project.icon />
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <motion.a
                                        href={project.demoLink}
                                        className="project-link"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaExternalLinkAlt /> Live Demo
                                    </motion.a>
                                    <motion.a
                                        href={project.codeLink}
                                        className="project-link"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaGithub /> Code
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects; 