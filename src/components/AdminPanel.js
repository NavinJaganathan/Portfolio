import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AdminPanel.css';

const AdminPanel = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/messages');
            const result = await response.json();
            
            if (result.success) {
                setMessages(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (messageId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/messages/${messageId}/read`, {
                method: 'PUT'
            });
            const result = await response.json();
            
            if (result.success) {
                setMessages(messages.map(msg => 
                    msg.id === messageId ? { ...msg, is_read: true } : msg
                ));
            }
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return (
            <div className="admin-panel">
                <div className="loading">Loading messages...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-panel">
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <motion.div
                className="admin-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Portfolio Messages</h1>
                <p>Total messages: {messages.length}</p>
            </motion.div>

            <motion.div
                className="messages-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {messages.length === 0 ? (
                    <div className="no-messages">
                        <p>No messages yet.</p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <motion.div
                            key={message.id}
                            className={`message-card ${message.is_read ? 'read' : 'unread'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="message-header">
                                <div className="message-info">
                                    <h3>{message.name}</h3>
                                    <p className="email">{message.email}</p>
                                    <p className="subject">{message.subject}</p>
                                </div>
                                <div className="message-meta">
                                    <span className="timestamp">{formatDate(message.timestamp)}</span>
                                    {!message.is_read && (
                                        <button
                                            className="mark-read-btn"
                                            onClick={() => markAsRead(message.id)}
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="message-content">
                                <p>{message.message}</p>
                            </div>
                            <div className="message-actions">
                                <a href={`mailto:${message.email}`} className="reply-btn">
                                    Reply
                                </a>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default AdminPanel;
