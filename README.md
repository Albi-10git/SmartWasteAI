# 🌱 SmartWasteAI - AI Powered Smart Waste Management System

SmartWasteAI is a web-based platform designed to improve waste segregation, waste reporting, recycling awareness, and sustainable waste management using modern web technologies.

The system allows citizens to report waste issues, upload waste images, track eco-friendly activities, and receive smart waste management assistance.

---

## 📌 Project Overview

Improper waste segregation and delayed waste reporting are major challenges in maintaining clean cities.

SmartWasteAI provides a digital solution that connects citizens with smart waste management services.

The platform helps users:
- Identify and report waste problems
- Upload waste-related images
- Detect waste locations
- Track sustainability actions
- Learn proper recycling methods

---

## ✨ Features

### 🔐 User Authentication
- User Registration
- User Login
- Profile Management
- Secure Logout

### 📍 Waste Location Detection
- Automatic location detection
- Address identification using Geolocation API
- Helps locate waste problems easily

### 📷 Waste Image Upload
- Upload waste images
- Image preview feature
- Supports future AI-based waste classification

### 📝 Waste Complaint Reporting
Citizens can submit complaints with:
- Name
- Waste Type
- Location
- Waste Photo
- Description

Includes:
- Form Validation
- Character Counter
- Input Events

### 🌱 Eco Points System
Encourages sustainable actions by rewarding users.

Eco Points are awarded for:
- Reporting waste
- Uploading waste images
- Recycling awareness activities

### 🔔 Smart Notifications
Provides community alerts and waste management updates using Notification API.

### ♻ Recycling Awareness
Provides recycling information and eco-friendly tips.

---

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- SQLite Database

---

## 🔗 APIs Used

- Geolocation API
- File API
- Clipboard API
- Notification API
- OpenStreetMap API

---

## 📂 Folder Structure

```
AI-WASTE-MANAGEMENT

├── public
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── tailwind-config.js
│
├── server
│   ├── server.js
│   ├── database.db
│   ├── package.json
│   └── package-lock.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation Steps

### Clone Repository

```
git clone <repository-url>
```

### Install Dependencies

Move into server folder:

```
cd server
```

Install packages:

```
npm install
```

Start server:

```
node server.js
```

Open application:

```
http://localhost:3000
```

---

## 🗄️ Database

SQLite database is used for storing application data.

Current Database:

- database.db

Tables:
- users

The user table stores authentication details.

---

## 🚀 Future Enhancements

- AI Waste Classification Model
- Municipality Dashboard
- Real-time Complaint Tracking
- AI Chatbot Assistant
- Waste Collection Analytics
- Mobile Application Support

---

## 🎯 Goal

The goal of SmartWasteAI is to encourage proper waste segregation and create cleaner communities through technology-driven waste management.

---

## 👨‍💻 Developed By

Albin Thomas