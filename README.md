# Biometric Student Management System

A **MERN-based Biometric Student Management and Attendance System** designed to digitally register students and manage their daily attendance using **fingerprint-based authentication**.  
This project focuses on **secure data handling, accurate attendance tracking, and modern UI design** suitable for educational institutions.

---

## Project Overview

The **Biometric Student Management System** is a web-based application that allows administrators to:

- Register students with personal and academic details
- Capture and store biometric fingerprint templates securely
- Record student entry and exit attendance using fingerprint verification
- Generate attendance reports with advanced filtering
- Manage student records (edit / delete)

The system is built using the **MERN stack** and follows clean architecture and best development practices.

---

## Key Features

-  **Biometric-based Attendance System**
-  **Student Registration & Management**
-  **Entry & Exit Attendance Tracking**
-  **Daily, Weekly & Monthly Reports**
-  **Gender-based Attendance Filtering (Girls / Boys)**
-  **Admin Dashboard with Sidebar Navigation**
-  **Modern UI using Tailwind CSS & DaisyUI**
-  **Fully Responsive Design**

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- DaisyUI
- Axios
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

## 🗄️ Database Structure

### Collections
- **Admin**
- **Students**
- **Attendance**

### Student Data Includes:
- Name
- Father Name
- Age
- Class
- Roll Number
- Gender (Boy / Girl)
- Contact Information
- Encrypted Fingerprint Template

---

## Biometric Fingerprint Handling

- Fingerprint data is **NOT stored as images**
- Only **encrypted fingerprint templates** are stored in MongoDB
- Biometric matching is **simulated** for academic purposes
- Real-world SDK integration points are clearly documented in the backend

This project does **not** store raw biometric images for security reasons.

---

## Attendance & Reports

The system supports:
- Entry & exit time logging
- Attendance status (Present / Absent)
- Filtering by:
  - Date
  - Week
  - Month
  - Gender (Girls / Boys)
  - Class
