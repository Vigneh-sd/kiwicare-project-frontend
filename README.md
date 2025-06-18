# KiwiCare Frontend 🥝

**KiwiCare** is a full-stack volunteer help platform where users can request assistance from available volunteers.  
The KiwiCare Frontend is a responsive web application built with React.js and styled using Tailwind CSS. It provides role-based dashboards for users, volunteers, and admins, enabling help requests, availability setup, bookings, messaging, and payments. The app interacts with a secure Spring Boot backend via JWT-authenticated REST APIs and delivers a clean user experience with modern UI practices.

---

## 🎥 Live Demo

📺 [Watch Full Project Demo on Google Drive](https://drive.google.com/file/d/1w8ALWM0EP5M7X1GCkgn6r2YikFMj_K2S/view?usp=drivesdk)


---

## 🚀 Tech Stack

- **React.js** (Vite)
- **Tailwind CSS**
- **Axios**
- **JWT Auth (via backend)**
- **React Router**
- **React Toastify** for notifications

---

## 🧩 Key Features

✅ Register/Login for **User**, **Volunteer**, and **Admin**  
✅ Role-Based Dashboards  
✅ **Request Help** with date and time range  
✅ **Volunteer Availability** setup  
✅ **Booking Management** (view, cancel, payment)  
✅ **Secure Messaging** between users and volunteers  
✅ **Admin Panel** with user and booking management  
✅ JWT authentication and protected routes

---

## 🔗 Backend Repository

➡️ **KiwiCare Backend (Spring Boot):** [Click here to view the backend repo](https://github.com/Vigneh-sd/Backend_Kiwicare.git)

---

## 👨‍💻 Author

Developed by **Vignesh Subramaniam**  
📧 Connect with me on [LinkedIn](https://www.linkedin.com/in/vigneshsubramaniam07/)


---

# 🥝 KiwiCare – Complete Project Explanation

## 🧠 Overview

**KiwiCare** is a full-stack volunteer help platform that enables users to request assistance, volunteers to offer availability, and admins to manage the entire system. The platform is built with:

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Spring Boot + Spring Security + JWT
- **Database:** MySQL-compatible

The application supports **role-based dashboards** with different capabilities for **Users**, **Volunteers**, and **Admins**.

---

## 🔐 1. User Registration & Login

### ✅ Registration
- Users can register with:
  - Name
  - Email
  - Password
  - Location
  - Role (User / Volunteer / Admin)
- Backend stores the user securely:
  - Passwords hashed with BCrypt
  - Role-based logic is stored and used to control access

### 🔓 Login
- JWT access and refresh tokens are issued on successful login.
- Role is decoded from the token.
- Redirects user to the appropriate dashboard (User, Volunteer, Admin).

---

## 👤 2. Features for Regular Users

### 🏠 User Dashboard
- View welcome message, role, and quick-access features.

### 🙋‍♂️ Request Help
- Select a date and time range (from-time, to-time).
- Search for available volunteers based on those times.
- Book a volunteer by confirming the request.

### 📅 My Bookings
- View all current and past bookings.
- Cancel a booking if needed (with automatic refund).

### 💬 Messaging
- Chat with the assigned volunteer in a WhatsApp-style thread.
- View received and sent messages.

### 💳 Make Payment
- Pay for confirmed bookings via a simple payment form.
- Store booking ID and amount.

### 📂 Payment History
- View all successful and refunded payments.
- Track payment status (Completed / Cancelled / Refunded).

---

## 🤝 3. Features for Volunteers

### 🏠 Volunteer Dashboard
- Personalized dashboard for volunteers with quick navigation.

### ⏰ Set Availability
- Choose a specific date and provide from-time and to-time range.
- Stored in the database and used for user help searches.

### 📅 My Bookings
- View all bookings assigned by users.
- Prepare to offer help based on booked slots.

### 💬 Messaging
- Chat directly with users via the internal messaging system.
- View received and sent messages.

---

## 🛠️ 4. Features for Admin

### 🏠 Admin Dashboard
- Centralized panel with overview and controls.

### 👥 Manage Users & Volunteers
- View all registered users, volunteers, and admins.
- Delete accounts when necessary.

### 📅 View All Bookings
- See every booking made across the platform.
- Track date, time, user, volunteer, and status.

---

## 🧩 Role-Based Access (Backend Logic)

- Secured using Spring Security with `@PreAuthorize` annotations.
- JWT tokens are verified before allowing access to any protected endpoint.
- Role-checking ensures only authorized actions are allowed:
  - Users cannot access admin endpoints.
  - Volunteers cannot access user booking APIs.
  - Admins can manage all accounts and view all bookings.

---

## 🛠 Technologies Used

- **React.js** + **Tailwind CSS** – Frontend
- **Spring Boot**, **Spring Security**, **JWT** – Backend
- **JPA**, **Hibernate**, **MySQL** – Database
- **Axios**, **React Router**, **Toastify**, **JWT Decode** – Frontend tools

---

## ✅ Summary

KiwiCare is a complete role-based web platform that offers real-time help request, booking, chat, and payment features for communities. It is designed to be modular, scalable, and easily extendable for production-ready deployment.




 








