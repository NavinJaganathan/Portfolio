import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaUserCircle } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "Hi, I'm Navin";
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setText(fullText.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, fullText]);

    const scrollToAbout = () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <section className="hero" id="home">
            <div className="hero-particles">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="container">
                <div className="hero-container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="hero-title">
                            <span className="typing-text">{text}</span>
                            <span className="highlight">|</span>
                        </h1>
                        <h2 className="hero-subtitle">Full Stack Developer</h2>
                        <p className="hero-description">
                            Passionate about creating innovative web solutions and turning ideas into reality through code.
                            Specialized in React, Node.js, and modern web technologies.
                        </p>
                        <div className="hero-buttons">
                            <motion.a
                                href="#projects"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Work
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="btn btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-image"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="hero-avatar">
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

            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={scrollToAbout}
            >
                <FaChevronDown />
            </motion.div>
        </section>
    );
};

export default Hero; 