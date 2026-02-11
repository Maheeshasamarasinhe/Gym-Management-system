<div align="center">

# 🏋️ Gym Management System

<img src="gymlife-master/react-gymlife/public/img/hero/hero-1.jpg" alt="Gym Management System" width="800"/>

**A full-stack gym management platform built with React & Spring Boot**

[![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---

## 📖 Overview

A comprehensive gym management system with **role-based access** for Admins, Trainers, and Clients. The system handles member management, workout scheduling, nutrition planning, attendance tracking, payment management, and fitness progress monitoring.

<div align="center">
<img src="gymlife-master/react-gymlife/public/img/hero/hero-2.jpg" alt="Gym Features" width="700"/>
</div>

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Frontend** | React 18.2.0 | SPA with React Router DOM 6.8.0 |
| **Backend** | Spring Boot 3.2.5 | REST API with Java 17 |
| **Database** | MySQL 8.0 | 11 relational tables |
| **Auth** | JWT + Spring Security | Stateless token-based authentication |
| **ORM** | Hibernate / JPA | Auto DDL with `spring.jpa.hibernate.ddl-auto=update` |
| **API Docs** | SpringDoc OpenAPI 2.5.0 | Swagger UI at `/swagger-ui.html` |
| **Build** | Maven 3.9.6 | Backend build tool |
| **Styling** | Custom CSS | Dark theme with orange accents |

---

## ✨ Features

### 👨‍💼 Admin / Trainer Features
| Feature | Description |
|---------|-------------|
| **Member Management** | View, manage, and remove gym members |
| **Exercise Library** | Create & manage exercises with steps, rounds, images, and videos |
| **Schedule Management** | Assign personalized workout schedules to members |
| **Nutrition Planning** | Create nutrition plans (protein, carbs, fiber, water) |
| **Attendance Tracking** | Mark and monitor daily member attendance |
| **Payment Management** | Track monthly payment status (Paid / Pending) |
| **Notifications** | Send notifications to members |
| **Trainer Profiles** | Manage trainer info, social links, and profile pictures |

### 👤 Client Features
| Feature | Description |
|---------|-------------|
| **Personal Dashboard** | View assigned schedules, nutrition plans & progress |
| **Fitness Tracking** | Log monthly weight and chest measurements |
| **Notifications** | Receive and view notifications from trainers |
| **Profile Management** | Update personal profile information |

---

## 🗃️ Database Schema

The system uses **11 MySQL tables** with the following relationships:

```
┌──────────┐
│  users   │──────┐
└──────────┘      │
                  ├──→ ┌──────────┐    ┌────────────────┐
                  │    │ members  │───→│ payments        │
                  │    │          │───→│ attendance      │
                  │    │          │───→│ progress        │
                  │    │          │───→│ schedules       │
                  │    │          │───→│ nutrition_plans  │
                  │    │          │───→│ notifications   │
                  │    │          │───→│ member_exercises │←── exercises
                  │    └──────────┘    └────────────────┘
                  │
                  └──→ ┌──────────┐
                       │ trainers │
                       └──────────┘
```

### Table Summary

| Table | Key Columns |
|-------|-------------|
| **users** | `id`, `role` (ADMIN / TRAINER / CLIENT), `email`, `password` |
| **members** | `user_id` → users, `name`, `age`, `sex`, `height`, `current_weight`, `membership_status` |
| **trainers** | `user_id` → users, `name`, `experience`, `phone`, `instagram`, `facebook` |
| **exercises** | `name`, `steps`, `rounds`, `image_url`, `video_url` |
| **member_exercises** | `member_id` → members, `exercise_id` → exercises |
| **schedules** | `member_id` → members, `exercise_name`, `steps`, `rounds` |
| **nutrition_plans** | `member_id` → members, `protein`, `carbs`, `fiber`, `water_liters` |
| **payments** | `member_id` → members, `payment_date`, `payment_month`, `status` |
| **attendance** | `member_id` → members, `attend_date` |
| **progress** | `member_id` → members, `month`, `weight`, `chest` |
| **notifications** | `member_id` → members, `message`, `seen` |

---

## 🔐 Authentication & Security

The system uses **JWT-based stateless authentication** with role-based access control:

| URL Pattern | Access Level |
|-------------|-------------|
| `/api/auth/**` | 🌐 Public |
| `/api/manage/**` | 🔑 Admin or Trainer |
| `/api/admin/**` | 🔒 Admin only |
| `/api/trainer/**` | 🔒 Trainer only |
| `/api/client/**` | 🔒 Client only |
| `/swagger-ui/**` | 🌐 Public |

**Login flow**: User selects role (Admin / Trainer / Client) → credentials are verified → JWT token returned → token sent in `Authorization: Bearer` header for all subsequent requests.

---

## 📡 REST API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Generic login |
| POST | `/auth/login/admin` | Admin login (role verified) |
| POST | `/auth/login/trainer` | Trainer login (role verified) |
| POST | `/auth/login/client` | Client login (role verified) |
| POST | `/auth/register` | Generic registration |
| POST | `/auth/register/admin` | Register as admin |
| POST | `/auth/register/trainer` | Register as trainer |
| POST | `/auth/register/client` | Register as client |

### Members (`/api/manage/members`) — Admin & Trainer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manage/members` | List all members |
| GET | `/manage/members/{id}` | Get member by ID |
| DELETE | `/manage/members/{id}` | Remove a member |

### Exercises (`/api/manage/exercises`) — Admin & Trainer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manage/exercises` | List all exercises |
| GET | `/manage/exercises/{id}` | Get exercise by ID |
| POST | `/manage/exercises` | Create exercise |
| PUT | `/manage/exercises/{id}` | Update exercise |
| DELETE | `/manage/exercises/{id}` | Delete exercise |

### Schedules (`/api/manage/schedules`) — Admin & Trainer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manage/schedules/member/{memberId}` | Get member's schedule |
| POST | `/manage/schedules` | Create schedule entry |
| PUT | `/manage/schedules/{id}` | Update schedule |
| DELETE | `/manage/schedules/{id}` | Delete schedule |

### Nutrition (`/api/manage/nutrition`) — Admin & Trainer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manage/nutrition/member/{memberId}` | Get member's nutrition plan |
| POST | `/manage/nutrition` | Create nutrition plan |
| PUT | `/manage/nutrition/{id}` | Update nutrition plan |
| DELETE | `/manage/nutrition/{id}` | Delete nutrition plan |

### Payments (`/api/manage/payments`) — Admin & Trainer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manage/payments/member/{memberId}` | Get member's payments |
| POST | `/manage/payments` | Record payment |
| PUT | `/manage/payments/{id}` | Update payment |
| DELETE | `/manage/payments/{id}` | Delete payment |

### Attendance (`/api/manage/attendance`) — Admin & Trainer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manage/attendance/member/{memberId}` | Get member's attendance |
| POST | `/manage/attendance` | Mark attendance |
| DELETE | `/manage/attendance/{id}` | Delete attendance record |

### Trainers (`/api/manage/trainers`) — Admin & Trainer
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manage/trainers` | List all trainers |
| GET | `/manage/trainers/{id}` | Get trainer by ID |
| PUT | `/manage/trainers/{id}` | Update trainer |
| DELETE | `/manage/trainers/{id}` | Delete trainer |

### Client (`/api/client`) — Client only
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/client/my-data` | Get own progress data |
| POST | `/client/progress` | Add progress entry |
| PUT | `/client/progress/{id}` | Update progress |
| DELETE | `/client/progress/{id}` | Delete progress |
| PUT | `/client/profile` | Update own profile |
| GET | `/client/notifications` | Get notifications |
| PUT | `/client/notifications/{id}/seen` | Mark notification as seen |

---

## 📁 Project Structure

```
Gym-Management-System/
│
├── gymlife-master/
│   ├── backend/                          # Spring Boot Backend
│   │   ├── pom.xml
│   │   ├── src/main/java/com/gymlife/
│   │   │   ├── GymManagementApplication.java
│   │   │   ├── auth/                     # Authentication module
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── User.java
│   │   │   │   ├── UserRepository.java
│   │   │   │   └── dto/
│   │   │   │       ├── AuthResponse.java
│   │   │   │       ├── LoginRequest.java
│   │   │   │       └── RegisterRequest.java
│   │   │   ├── config/                   # Security & JWT config
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtFilter.java
│   │   │   │   ├── JwtUtil.java
│   │   │   │   └── CustomUserDetailsService.java
│   │   │   ├── member/                   # Member module
│   │   │   │   ├── Member.java
│   │   │   │   ├── Progress.java
│   │   │   │   ├── Notification.java
│   │   │   │   ├── MemberRepository.java
│   │   │   │   ├── ProgressRepository.java
│   │   │   │   ├── NotificationRepository.java
│   │   │   │   ├── MemberService.java
│   │   │   │   ├── MemberController.java
│   │   │   │   └── dto/
│   │   │   ├── workout/                  # Exercises & schedules
│   │   │   │   ├── exercise.java
│   │   │   │   ├── schedule.java
│   │   │   │   ├── exerciseRepository.java
│   │   │   │   ├── scheduleRepository.java
│   │   │   │   ├── workoutService.java
│   │   │   │   ├── exerciseController.java
│   │   │   │   └── scheduleController.java
│   │   │   ├── nutrition/                # Nutrition plans
│   │   │   ├── payment/                  # Payment tracking
│   │   │   ├── trainer/                  # Trainer profiles
│   │   │   ├── Attendance/               # Attendance tracking
│   │   │   └── common/                   # Shared enums & exceptions
│   │   └── src/main/resources/
│   │       ├── application.properties
│   │       └── schema.sql
│   │
│   └── react-gymlife/                    # React Frontend
│       ├── package.json
│       ├── public/
│       │   ├── index.html
│       │   ├── css/                      # Stylesheets
│       │   ├── img/                      # Images & media
│       │   └── fonts/
│       └── src/
│           ├── App.js                    # Main app with routes
│           ├── components/               # Reusable UI components
│           │   ├── AdminDashboard.js
│           │   ├── UserDashboard.js
│           │   ├── LoginForm.js
│           │   ├── RegistrationForm.js
│           │   ├── Header.js
│           │   └── ...                   # 20+ more components
│           ├── context/
│           │   └── AuthContext.js         # Auth state management
│           ├── pages/                    # Route page wrappers
│           └── services/
│               ├── api.js                # Axios API client
│               └── gymService.js
│
├── GYM_MANAGEMENT_README.md              # This file
└── BACKEND_SETUP.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17** (JDK)
- **Maven 3.9+**
- **MySQL 8.0** (or XAMPP with MySQL)
- **Node.js 14+** & **npm**

### 1. Database Setup

```bash
# Start MySQL, then create the database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS gym_management;"
```

> The schema tables are auto-created on first run via `schema.sql`.

### 2. Backend Setup

```bash
cd gymlife-master/backend

# Build and run (Maven must be in PATH)
mvn spring-boot:run
```

Backend starts at **http://localhost:8081**

API docs available at **http://localhost:8081/swagger-ui.html**

### 3. Frontend Setup

```bash
cd gymlife-master/react-gymlife

# Install dependencies
npm install

# Start development server
npm start
```

Frontend starts at **http://localhost:3000**

### 4. Configuration

Backend config in `gymlife-master/backend/src/main/resources/application.properties`:

| Property | Default | Description |
|----------|---------|-------------|
| `server.port` | `8081` | Backend port |
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/gym_management` | DB URL |
| `spring.datasource.username` | `root` | DB user |
| `spring.datasource.password` | *(empty)* | DB password |
| `jwt.expiration` | `86400000` | Token expiry (24h) |
| `cors.allowed-origins` | `http://localhost:3000` | CORS origin |

---

## 🔑 Roles & Permissions

| Role | Dashboard | Permissions |
|------|-----------|-------------|
| **ADMIN** | Admin Dashboard | Full access — manage members, trainers, exercises, schedules, nutrition, payments, attendance, notifications |
| **TRAINER** | Admin Dashboard | Same as Admin for member management via `/api/manage/**` |
| **CLIENT** | User Dashboard | View own schedule, nutrition, progress; track fitness; receive notifications |

---

## 📸 Screenshots

<div align="center">

### Home Page
<img src="gymlife-master/react-gymlife/public/img/hero/hero-1.jpg" alt="Home Page" width="600"/>

### Gym Classes
<table>
<tr>
<td><img src="gymlife-master/react-gymlife/public/img/classes/class-1.jpg" alt="Class 1" width="250"/></td>
<td><img src="gymlife-master/react-gymlife/public/img/classes/class-2.jpg" alt="Class 2" width="250"/></td>
<td><img src="gymlife-master/react-gymlife/public/img/classes/class-3.jpg" alt="Class 3" width="250"/></td>
</tr>
</table>

### Our Services
<table>
<tr>
<td><img src="gymlife-master/react-gymlife/public/img/services/services-1.jpg" alt="Service 1" width="250"/></td>
<td><img src="gymlife-master/react-gymlife/public/img/services/services-2.jpg" alt="Service 2" width="250"/></td>
<td><img src="gymlife-master/react-gymlife/public/img/services/services-3.jpg" alt="Service 3" width="250"/></td>
</tr>
</table>

</div>

---

## 📄 License

This project is part of the GymLife website template and follows the same licensing terms.