# Home Services Booking Platform

A full-stack home services booking platform connecting customers with professional taskers.  
The system supports customers, taskers, and admins with dedicated dashboards and workflows.

## 📌 Project Idea
The platform lets customers discover vetted service providers, book services with specific dates and times, pay using multiple methods, and track booking status. Taskers manage their services, earnings, and customers, while admins oversee platform activity and quality.

## 🛠 Tech Stack
- **Frontend**: React (Create React App), React Router, Axios, Tailwind CSS, React Icons, Lucide React, QR/QRCode utilities  
- **Backend**: Node.js, Express, Passport (local strategy), Multer, Express Session, Body-Parser  
- **Database**: PostgreSQL (via `pg` client)  
- **Authentication**: Session-based authentication with Passport (role-aware: user / tasker / admin)  
- **Messaging**: Database-backed chat system with conversations and notifications  

## ✨ Features

### User Features (Customers)
- **Account management**: Registration, login, profile, address, and city management  
- **Service discovery**: Browse tasker posts (title, description, price, service type)  
- **Service booking**: Book services with date, time, address, and city  
- **Flexible payments**: Pay via cash, card, or in-app wallet  
- **Wallet management**: Top up balance and view available funds  
- **Order tracking**: View booking history and status (In progress / Completed / Cancelled)  
- **Chat with taskers**: Exchange messages in dedicated conversations  
- **Notifications**: Receive updates for bookings, completions, cancellations, and chat messages  
- **Feedback & ratings**: Rate taskers (1–5) and leave comments  

### Tasker Features
- **Tasker onboarding**: Register as a tasker with service type, company name, and city  
- **Profile management**: Update profile details and upload profile image  
- **Service posts**: Create, edit, and delete service posts with pricing  
- **Booking management**: View all assigned bookings and update status (e.g., mark as completed)  
- **Wallet & earnings**: Receive transfers from users and track earnings  
- **Chat with customers**: Manage conversation and chat lists per customer  
- **Notifications**: Get notified about new bookings, cancellations, and messages  
- **Feedback insights**: View feedback and ratings left by customers  

### Admin Features
- **Tasker management**: View all taskers and remove taskers when necessary (with safe cascading deletes)  
- **Booking oversight**: Review all bookings across the platform  
- **Payments overview**: View payment records and amounts paid to taskers  
- **Platform health**: Benefit from robust deletion flows that clean up related payments, bookings, messages, feedback, and notifications when an account is removed  

## 🎥 Full System Demo
Watch the full system demo including code and database explanation:  
https://youtu.be/J5qbQL0tWjk  


> **Note**: Backend routes and controllers are currently centralized in `index.js` for simplicity.

## 🚀 How to Run Locally
1. **Clone the repository**  
   ```bash
   git clone <repo-url>
   cd Home-service-booking-platform
   ```  
2. **Install root dependencies** (for shared packages like Socket.io, etc.)  
   ```bash
   npm install
   ```  
3. **Install frontend dependencies**  
   ```bash
   cd frontend
   npm install
   ```  
4. **Install backend dependencies**  
   ```bash
   cd ../backend
   npm install
   ```  
5. **Set environment variables / database**  
   - Create a PostgreSQL database and update the connection details in `backend/index.js` (`user`, `host`, `database`, `password`, `port`).  
   - Ensure required tables exist (`users`, `taskers`, `posts`, `bookings`, `payments`, `messages`, `notifications`, `feedback`, `admin`, etc.).  
6. **Run the backend**  
   ```bash
   cd backend
   npm start
   ```  
7. **Run the frontend**  
   ```bash
   cd ../frontend
   npm start
   ```  
8. Open the app in your browser (frontend default: `http://localhost:3000`).  
   The backend typically runs on a separate port (for example, `http://localhost:3000`); update ports and proxy configuration as needed.

## 👤 Author
Abdelrahman Mohamed
