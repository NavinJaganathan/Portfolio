# 🚀 Navin J.R - Portfolio Website

A modern, responsive portfolio website built with React.js frontend and Node.js backend with MySQL database integration.

## ✨ Features

- **🎨 Modern Dark Theme** - Beautiful dark UI with smooth animations
- **📱 Fully Responsive** - Works perfectly on all devices
- **💬 Contact Form** - Visitors can send messages directly
- **🗄️ MySQL Database** - All messages stored securely
- **📧 Email Notifications** - Get notified when someone contacts you
- **👨‍💼 Admin Panel** - View and manage all messages
- **⚡ Fast Performance** - Optimized with React and modern web technologies

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based architecture
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library
- **CSS3** - Modern styling with gradients and effects

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MySQL** - Database for storing messages
- **Nodemailer** - Email notifications

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Setup MySQL Database**
   - Open MySQL Workbench
   - Create database: `CREATE DATABASE portfolio;`

5. **Configure environment variables**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your MySQL credentials
   ```

6. **Start the servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   npm start
   ```

7. **Open your browser**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 📧 Email Notifications Setup

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password** for Mail
3. **Update `.env` file:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

## 🗄️ Database Schema

```sql
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);
```

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── navin-logo.jpg     # Logo image
│   └── navin-profile.jpg  # Profile picture
├── src/                   # React frontend
│   ├── components/        # React components
│   │   ├── Navbar.js      # Navigation bar
│   │   ├── Hero.js        # Hero section
│   │   ├── About.js       # About section
│   │   ├── Projects.js    # Projects showcase
│   │   ├── Skills.js      # Skills section
│   │   ├── Contact.js      # Contact form
│   │   ├── AdminPanel.js  # Admin panel
│   │   └── Footer.js      # Footer
│   └── App.js             # Main App component
├── backend/               # Node.js backend
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
└── README.md              # This file
```

## 🎯 API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/messages` - Get all messages (admin)
- `PUT /api/messages/:id/read` - Mark message as read

## 🔧 Customization

### Personal Information
- Update name in `src/components/Navbar.js`
- Replace profile images in `public/` folder
- Update contact details in `src/components/Contact.js`

### Styling
- Modify colors in CSS files
- Update animations in component files
- Customize gradients and effects

### Projects
- Add your projects in `src/components/Projects.js`
- Update skills in `src/components/Skills.js`

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build: `npm run build`
2. Deploy `build` folder
3. Update API URL in Contact.js

### Backend (Railway/Heroku)
1. Connect GitHub repository
2. Set environment variables
3. Use MySQL hosting service

## 📞 Contact

**Navin J.R**
- 📧 Email: navinjaganathan2006@gmail.com
- 📱 Phone: +91-8072225049
- 📍 Location: Coimbatore, Tamil Nadu
- 🔗 LinkedIn: [linkedin.com/in/navin-j-r-589b92285](https://www.linkedin.com/in/navin-j-r-589b92285)
- 🐙 GitHub: [github.com/NavinJaganathan](https://github.com/NavinJaganathan)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for amazing documentation
- Framer Motion for smooth animations
- React Icons for beautiful icons
- MySQL for reliable database storage

---

⭐ **Star this repository if you found it helpful!**