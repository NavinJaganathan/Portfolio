import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaVuejs, FaAngular,
    FaNodeJs, FaPython, FaDatabase, FaServer, FaAws, FaDocker,
    FaGitAlt, FaGithub, FaFigma, FaCodeBranch, FaMobileAlt, FaRocket,
    FaJava, FaLeaf
} from 'react-icons/fa';
import { SiSpringboot, SiGradle, SiHibernate } from 'react-icons/si';
import './Skills.css';

const Skills = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const skillCategories = [
        {
            title: 'Frontend',
            skills: [
                { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
                { name: 'CSS', icon: FaCss3Alt, color: '#1572b6' },
                { name: 'JavaScript', icon: FaJsSquare, color: '#f7df1e' },
                { name: 'React js', icon: FaReact, color: '#61dafb' },
            ]
        },
        {
            title: 'Backend',
            skills: [
                { name: 'Java', icon: FaJava, color: '#007396' },
                { name: 'Spring Boot', icon: SiSpringboot, color: '#6db33f' },
                { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
                { name: 'Python(Basic)', icon: FaPython, color: '#3776ab' },
                { name: 'MySQL', icon: FaDatabase, color: '#4479a1' },
                { name: 'MongoDB', icon: FaDatabase, color: '#47a248' },
            ]
        },
        {
            title: 'Tools & Others',
            skills: [
                { name: 'Git', icon: FaGitAlt, color: '#f05032' },
                { name: 'GitHub', icon: FaGithub, color: '#181717' },
                { name: 'Figma', icon: FaFigma, color: '#f24e1e' },
                { name: 'AWS', icon: FaAws, color: '#232f3e' },
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const categoryVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const skillVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="skills" className="skills">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Skills & Technologies
                </motion.h2>

                <motion.div
                    className="skills-content"
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            className="skills-category"
                            variants={categoryVariants}
                        >
                            <h3>{category.title}</h3>
                            <div className="skills-grid">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        className="skill-item"
                                        variants={skillVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <skill.icon style={{ color: skill.color }} />
                                        <span>{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills; 