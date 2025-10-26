import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        closeMenu();
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <motion.div
                    className="nav-logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <a href="#home">
                        <img
                            src="/navin-logo.jpg"
                            alt="Navin Logo"
                            className="nav-logo-img"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <span className="nav-logo-text"></span>
                    </a>
                </motion.div>

                <motion.ul
                    className={`nav-menu ${isOpen ? 'active' : ''}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <li className="nav-item">
                        <a
                            href="#home"
                            className="nav-link"
                            onClick={() => scrollToSection('home')}
                        >
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#about"
                            className="nav-link"
                            onClick={() => scrollToSection('about')}
                        >
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#projects"
                            className="nav-link"
                            onClick={() => scrollToSection('projects')}
                        >
                            Projects
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#skills"
                            className="nav-link"
                            onClick={() => scrollToSection('skills')}
                        >
                            Skills
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="#contact"
                            className="nav-link"
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact
                        </a>
                    </li>
                </motion.ul>

                <motion.div
                    className="hamburger"
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar; 