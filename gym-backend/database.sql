-- Gym Management System Database Schema

CREATE DATABASE IF NOT EXISTS gym_management;
USE gym_management;

-- Users table (both admin and members)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'user') DEFAULT 'user',
    membership_status ENUM('Active', 'Inactive') DEFAULT 'Active',
    payment_status ENUM('Paid', 'Pending') DEFAULT 'Pending',
    join_date DATE DEFAULT (CURRENT_DATE),
    last_payment DATE,
    weight VARCHAR(10),
    height VARCHAR(10),
    fitness_level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    nutrition_plan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Exercises table
CREATE TABLE exercises (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User schedules (assigned exercises)
CREATE TABLE user_schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    exercise_id INT NOT NULL,
    sets VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- Attendance tracking
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (user_id, attendance_date)
);

-- Fitness data tracking
CREATE TABLE fitness_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    record_date DATE NOT NULL,
    weight DECIMAL(5,2),
    body_fat DECIMAL(5,2),
    muscle_mass DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@gym.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert demo user
INSERT INTO users (name, email, password, phone, weight, height, fitness_level) VALUES 
('John Doe', 'user@gym.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '123-456-7890', '75', '180', 'Intermediate');

-- Insert sample exercises
INSERT INTO exercises (name, category, difficulty, description) VALUES 
('Push-ups', 'Chest', 'Beginner', 'Basic push-up exercise for chest and arms'),
('Squats', 'Legs', 'Beginner', 'Basic squat exercise for legs and glutes'),
('Deadlifts', 'Back', 'Advanced', 'Compound lifting exercise for back and legs'),
('Bench Press', 'Chest', 'Intermediate', 'Chest strengthening exercise with weights'),
('Pull-ups', 'Back', 'Intermediate', 'Upper body pulling exercise'),
('Lunges', 'Legs', 'Beginner', 'Single leg strengthening exercise'),
('Plank', 'Core', 'Beginner', 'Core stability exercise'),
('Burpees', 'Cardio', 'Intermediate', 'Full body cardio exercise'),
('Mountain Climbers', 'Cardio', 'Intermediate', 'High intensity cardio exercise'),
('Bicep Curls', 'Arms', 'Beginner', 'Arm strengthening exercise');