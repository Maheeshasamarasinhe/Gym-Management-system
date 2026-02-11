# Gym Management System - Backend Setup

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MySQL** (v8.0 or higher)
3. **npm** or **yarn**

## Database Setup

1. **Install MySQL** and start the MySQL service

2. **Create the database** by running the SQL script:
   ```bash
   mysql -u root -p < gym-backend/database.sql
   ```
   
   Or manually:
   - Open MySQL command line or phpMyAdmin
   - Copy and paste the contents of `gym-backend/database.sql`
   - Execute the script

3. **Update database credentials** in `gym-backend/.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=gym_management
   JWT_SECRET=gym_secret_key_2024
   PORT=5000
   ```

## Backend Installation

1. **Navigate to backend directory**:
   ```bash
   cd gym-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Verify installation**:
   - Open browser and go to `http://localhost:8081/api/health`
   - You should see: `{"message": "Gym Management API is running"}`

## Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd gymlife-master/react-gymlife
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the React app**:
   ```bash
   npm start
   ```

4. **Access the application**:
   - Open browser and go to `http://localhost:3000`

## Default Login Credentials

### Admin Account
- **Email**: admin@gym.com
- **Password**: password (bcrypt hashed in database)

### User Account  
- **Email**: user@gym.com
- **Password**: password (bcrypt hashed in database)

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `POST /api/users/:id/attendance` - Mark attendance
- `POST /api/users/:id/fitness` - Add fitness data
- `DELETE /api/users/:id/fitness/:fitnessId` - Delete fitness data

### Exercises
- `GET /api/exercises` - Get all exercises
- `POST /api/exercises` - Create new exercise
- `POST /api/exercises/assign` - Assign exercise to user
- `DELETE /api/exercises/assign/:userId/:exerciseId` - Remove exercise from user

### Statistics
- `GET /api/stats` - Get gym statistics

## Database Schema

### Tables Created:
1. **users** - User accounts (admin/members)
2. **exercises** - Exercise library
3. **user_schedules** - User workout assignments
4. **attendance** - Attendance tracking
5. **fitness_data** - User fitness measurements

## Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Check MySQL service is running
   - Verify credentials in `.env` file
   - Ensure database `gym_management` exists

2. **Port Already in Use**:
   - Change PORT in `.env` file
   - Kill process using port 5000: `netstat -ano | findstr :5000`

3. **CORS Issues**:
   - Backend includes CORS middleware
   - Ensure frontend runs on `http://localhost:3000`

4. **Authentication Issues**:
   - Check JWT_SECRET in `.env`
   - Verify token storage in browser localStorage

## Development Notes

- Backend uses bcryptjs for password hashing
- JWT tokens expire in 24 hours
- Database uses connection pooling for performance
- All routes include error handling
- Foreign key constraints maintain data integrity

## Production Deployment

1. **Environment Variables**:
   - Set production database credentials
   - Use strong JWT_SECRET
   - Set NODE_ENV=production

2. **Database**:
   - Use production MySQL instance
   - Enable SSL connections
   - Regular backups

3. **Security**:
   - Enable HTTPS
   - Use environment variables for secrets
   - Implement rate limiting
   - Add input validation middleware