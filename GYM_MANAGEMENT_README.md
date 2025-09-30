# Gym Management System

A comprehensive gym management system built with React that includes user and admin functionalities for managing gym operations, member schedules, attendance, payments, and fitness tracking.

## Features

### Admin Features
- **User Management**: View and manage all gym members
- **Attendance Tracking**: Mark and track member attendance
- **Payment Management**: Monitor and update payment statuses
- **Exercise Library**: Manage exercise database with categories and difficulty levels
- **Schedule Management**: Create personalized workout schedules for members
- **Nutrition Planning**: Assign nutrition plans and advice to members
- **Statistics Dashboard**: View gym statistics and member analytics

### User Features
- **Personal Dashboard**: View personal gym information and statistics
- **Workout Schedule**: View assigned exercises and workout plans
- **Nutrition Plan**: Access personalized nutrition advice and meal plans
- **Fitness Tracking**: Add, edit, and track personal fitness data (weight, body fat, muscle mass)
- **Profile Management**: View membership details and attendance history

## Demo Accounts

### Admin Account
- **Email**: admin@gym.com
- **Password**: admin123
- **Role**: Admin

### User Account
- **Email**: user@gym.com
- **Password**: user123
- **Role**: User

## Technology Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.8.0
- **Styling**: Custom CSS with existing gym theme
- **Data Storage**: Local Storage (for demo purposes)
- **State Management**: React Context API
- **Additional Libraries**: 
  - Axios (for future API integration)
  - Date-fns (for date handling)

## Installation and Setup

1. **Navigate to the project directory**:
   ```bash
   cd gymlife-master/react-gymlife
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── AdminDashboard.js      # Admin dashboard with all management features
│   ├── UserDashboard.js       # User dashboard with personal features
│   ├── LoginForm.js           # Authentication form
│   ├── Header.js              # Updated header with auth features
│   └── [existing components]  # All original gym website components
├── context/
│   └── AuthContext.js         # Authentication context and state management
├── pages/
│   ├── LoginPage.js           # Login page
│   ├── AdminDashboardPage.js  # Admin dashboard page wrapper
│   ├── UserDashboardPage.js   # User dashboard page wrapper
│   └── [existing pages]      # All original gym website pages
├── services/
│   └── gymService.js          # Data management service
└── App.js                     # Updated with new routes and auth provider
```

## Key Features Breakdown

### Admin Dashboard Tabs

1. **User Management**
   - View all gym members with their details
   - See payment status, membership status, and basic info
   - Quick access to manage individual user schedules
   - Toggle payment status
   - View attendance statistics

2. **Exercise Library**
   - Browse all available exercises
   - Add new exercises with categories and difficulty levels
   - Organized by categories (Chest, Legs, Back, Arms, Core, Cardio)
   - Difficulty levels (Beginner, Intermediate, Advanced)

3. **Attendance Management**
   - Mark daily attendance for members
   - View attendance statistics
   - Track member engagement

### User Dashboard Tabs

1. **My Schedule**
   - View assigned workout exercises
   - See exercise details, sets, and trainer notes
   - Exercise categories and difficulty levels

2. **Nutrition Plan**
   - Access personalized nutrition advice
   - View meal plans and dietary recommendations
   - Daily nutritional targets

3. **Fitness Data**
   - Add personal fitness measurements
   - Track weight, body fat percentage, muscle mass
   - Add notes for progress tracking
   - Edit and delete fitness entries
   - Visual progress overview

4. **Profile**
   - View personal information
   - Membership details and status
   - Payment information
   - Attendance history

## Data Management

The system uses a comprehensive data service (`gymService.js`) that manages:

- **User Data**: Personal info, membership details, schedules, nutrition plans
- **Exercise Library**: Complete exercise database with categories
- **Attendance Records**: Date-based attendance tracking
- **Payment Records**: Payment status and history
- **Fitness Data**: Personal measurements and progress tracking

All data is stored in localStorage for demo purposes, but the service is designed to easily integrate with a backend API.

## Authentication System

- **Role-based Access**: Admin and User roles with different permissions
- **Persistent Login**: User sessions maintained across browser sessions
- **Protected Routes**: Dashboard access based on user roles
- **Logout Functionality**: Secure logout with session cleanup

## Responsive Design

The system maintains the original gym website's responsive design:
- **Mobile-friendly**: Works on all device sizes
- **Consistent Styling**: Matches the existing gym theme
- **Dark Theme**: Professional gym aesthetic with orange accents
- **Intuitive Navigation**: Easy-to-use interface for both admins and users

## Future Enhancements

The system is designed for easy expansion:

1. **Backend Integration**: Replace localStorage with REST API
2. **Real-time Updates**: WebSocket integration for live data
3. **Advanced Analytics**: Charts and graphs for progress tracking
4. **Notification System**: Reminders and alerts
5. **Payment Gateway**: Online payment processing
6. **Mobile App**: React Native version
7. **Trainer Portal**: Separate interface for gym trainers
8. **Class Scheduling**: Group class management
9. **Equipment Tracking**: Gym equipment maintenance
10. **Member Communication**: In-app messaging system

## Usage Instructions

### For Admins:
1. Login with admin credentials
2. Use the dashboard tabs to manage different aspects
3. Click on users to manage their individual schedules
4. Add exercises to the library for assignment to users
5. Mark attendance and update payment statuses
6. Create nutrition plans for members

### For Users:
1. Login with user credentials
2. View your assigned workout schedule
3. Check your nutrition plan
4. Add and track your fitness data
5. Monitor your progress and attendance
6. Update your fitness measurements regularly

## Support and Maintenance

The system includes:
- **Error Handling**: Graceful error management
- **Data Validation**: Input validation and sanitization
- **Performance Optimization**: Efficient data loading and updates
- **Code Documentation**: Well-documented codebase
- **Modular Design**: Easy to maintain and extend

## License

This project is part of the gym website template and follows the same licensing terms.