import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub,
    FaLinkedin, FaTwitter, FaInstagram
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [notification, setNotification] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            setIsSubmitting(false);
            return;
        }

        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            setIsSubmitting(false);
            return;
        }

        try {
            // Send data to backend
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                showNotification(result.message, 'success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                showNotification(result.message || 'Failed to send message', 'error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const socialLinks = [
        { icon: FaGithub, href: 'https://github.com/NavinJaganathan', label: 'GitHub' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/navin-j-r-589b92285/', label: 'LinkedIn' },
        { icon: FaTwitter, href: 'https://x.com/NavinJaganathan?t=EjNsD0IJhLMPzT8GyRgo8g&s=09', label: 'Twitter' },
        { icon: FaInstagram, href: 'https://www.instagram.com/luvit_navin?igsh=MWZ0dzRtbGFqa2hiZQ==', label: 'Instagram' }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.h2>

                <motion.div
                    className="contact-content"
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <motion.div className="contact-info" variants={itemVariants}>
                        <h3>Let's work together!</h3>
                        <p>I'm always interested in new opportunities and exciting projects. Feel free to reach out!</p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <FaEnvelope />
                                <span>navinjaganathan2006@gmail.com</span>
                            </div>
                            <div className="contact-item">
                                <FaPhone />
                                <span>+91-8072225049</span>
                            </div>
                            <div className="contact-item">
                                <FaMapMarkerAlt />
                                <span>Coimbature,Tmail Nadu</span>
                            </div>
                        </div>

                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    className="social-link"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={social.label}
                                >
                                    <social.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form className="contact-form" variants={itemVariants} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>

            {/* Notification */}
            {notification && (
                <motion.div
                    className={`notification notification-${notification.type}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                >
                    {notification.message}
                </motion.div>
            )}
        </section>
    );
};

export default Contact; 