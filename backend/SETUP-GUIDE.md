# 🚀 Portfolio Backend Setup Guide

## Quick Setup Steps:

### 1. Create Database in MySQL Workbench
1. **Open MySQL Workbench**
2. **Connect to your MySQL server**
3. **Run this SQL command:**
   ```sql
   CREATE DATABASE portfolio;
   USE portfolio;
   ```

### 2. Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
- ✅ Connected to MySQL database
- ✅ Contacts table ready
- 🚀 Server running on port 5000

### 3. Test Contact Form
1. **Start frontend:** `npm start` (in main project folder)
2. **Go to:** `http://localhost:3000`
3. **Fill out contact form**
4. **Submit message**

### 4. View Messages
- **Admin panel:** `http://localhost:3000/admin`
- **Or check MySQL Workbench** for stored messages

## 🔧 Configuration

**Edit `backend/.env` file:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio
DB_PORT=3306
```

## 📧 Email Notifications (Optional)

**Add to `.env` file:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🎯 Features

- ✅ **MySQL Database** storage
- ✅ **Contact form** API
- ✅ **Admin panel** to view messages
- ✅ **Email notifications**
- ✅ **Rate limiting** (5 messages per 15 minutes)
- ✅ **Input validation**

## 🚨 Troubleshooting

**"Database connection failed":**
- Make sure MySQL service is running
- Check if database "portfolio" exists

**"Access denied":**
- Check MySQL username/password in .env file

**"Database does not exist":**
- Run `CREATE DATABASE portfolio;` in MySQL Workbench

## 🎉 Ready to Go!

Your portfolio now has a complete backend with MySQL database! 🌟
