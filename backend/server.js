const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many contact form submissions, please try again later.'
});
app.use('/api/contact', limiter);

// MySQL connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio',
    port: process.env.DB_PORT || 3306
};

let db;

// Connect to MySQL database
async function connectDB() {
    try {
        db = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to MySQL database');

        // Create contacts table if it doesn't exist
        await createContactsTable();
    } catch (error) {
        console.error('❌ MySQL connection error:', error.message);
        console.log('💡 Make sure MySQL is running and database "portfolio" exists');
        console.log('💡 Create database in MySQL Workbench: CREATE DATABASE portfolio;');
    }
}

// Create contacts table
async function createContactsTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(500) NOT NULL,
      message TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_read BOOLEAN DEFAULT FALSE
    )
  `;

    try {
        await db.execute(createTableQuery);
        console.log('✅ Contacts table ready');
    } catch (error) {
        console.error('❌ Table creation error:', error.message);
    }
}

// Initialize database connection
connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Portfolio Backend API is running!',
        database: db ? 'Connected' : 'Disconnected'
    });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    try {
        // Check if database is connected
        if (!db) {
            return res.status(500).json({
                success: false,
                message: 'Database connection error. Please try again later.'
            });
        }

        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Insert message into database
        const insertQuery = `
      INSERT INTO contacts (name, email, subject, message) 
      VALUES (?, ?, ?, ?)
    `;

        const [result] = await db.execute(insertQuery, [name, email, subject, message]);

        const newContact = {
            id: result.insertId,
            name,
            email,
            subject,
            message,
            timestamp: new Date(),
            is_read: false
        };

        console.log('✅ New contact message saved:', newContact);

        // Send email notification (optional)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await sendEmailNotification(newContact);
        }

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.',
            data: {
                id: newContact.id,
                timestamp: newContact.timestamp
            }
        });

    } catch (error) {
        console.error('Contact form error:', error);

        // Specific error messages
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                success: false,
                message: 'Database connection failed. Please check if MySQL is running.'
            });
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            return res.status(500).json({
                success: false,
                message: 'Database access denied. Please check your MySQL credentials.'
            });
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            return res.status(500).json({
                success: false,
                message: 'Database "portfolio" does not exist. Please create it in MySQL Workbench.'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
});

// Get all messages (for admin panel)
app.get('/api/messages', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({
                success: false,
                message: 'Database connection error'
            });
        }

        const selectQuery = `
      SELECT id, name, email, subject, message, timestamp, is_read 
      FROM contacts 
      ORDER BY timestamp DESC
    `;

        const [messages] = await db.execute(selectQuery);

        res.json({
            success: true,
            data: messages
        });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages'
        });
    }
});

// Mark message as read
app.put('/api/messages/:id/read', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({
                success: false,
                message: 'Database connection error'
            });
        }

        const updateQuery = `
      UPDATE contacts 
      SET is_read = TRUE 
      WHERE id = ?
    `;

        const [result] = await db.execute(updateQuery, [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        // Get updated message
        const selectQuery = `SELECT * FROM contacts WHERE id = ?`;
        const [messages] = await db.execute(selectQuery, [req.params.id]);

        res.json({
            success: true,
            data: messages[0]
        });
    } catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update message'
        });
    }
});

// Email notification function
async function sendEmailNotification(contact) {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Your email
        subject: `New Portfolio Message: ${contact.subject}`,
        html: `
      <h2>New Message from Portfolio</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
      <hr>
      <p><em>Received at: ${contact.timestamp}</em></p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent');
    } catch (error) {
        console.error('❌ Email notification failed:', error);
    }
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Enabled' : 'Disabled'}`);
    console.log(`🗄️ Database: ${db ? 'Connected' : 'Disconnected'}`);
});
