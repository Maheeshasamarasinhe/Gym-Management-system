-- ============================================================
-- Gym Management System - MySQL Schema
-- ============================================================
-- Run this script to create the database and all tables.
-- Command:  mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS gym_management;
USE gym_management;

-- ===================== USERS =====================
CREATE TABLE IF NOT EXISTS users (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    role            VARCHAR(20)     NOT NULL COMMENT 'ADMIN | TRAINER | CLIENT',
    email           VARCHAR(255)    NOT NULL UNIQUE,
    password        VARCHAR(255)    NOT NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== MEMBERS =====================
CREATE TABLE IF NOT EXISTS members (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    user_id             INT             NOT NULL,
    name                VARCHAR(255)    NOT NULL,
    age                 INT,
    sex                 VARCHAR(10),
    address             VARCHAR(500),
    contact_number      VARCHAR(20),
    played_before       BOOLEAN         DEFAULT FALSE,
    goal                VARCHAR(255),
    vegetarian          BOOLEAN         DEFAULT FALSE,
    registered_date     DATE            NOT NULL,
    membership_status   VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE | INACTIVE',
    payment_package     VARCHAR(100),
    height              FLOAT,
    current_weight      FLOAT,
    chest_size          FLOAT,

    CONSTRAINT fk_members_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== TRAINERS =====================
CREATE TABLE IF NOT EXISTS trainers (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    user_id             INT             NOT NULL,
    name                VARCHAR(255)    NOT NULL,
    experience          VARCHAR(255),
    phone               VARCHAR(20),
    email               VARCHAR(255),
    instagram           VARCHAR(255),
    facebook            VARCHAR(255),
    profile_picture     VARCHAR(500),
    status              VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE | INACTIVE',

    CONSTRAINT fk_trainers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== EXERCISES =====================
CREATE TABLE IF NOT EXISTS exercises (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(255)    NOT NULL,
    steps           INT             NOT NULL DEFAULT 0,
    rounds          INT             NOT NULL DEFAULT 0,
    image_url       VARCHAR(500),
    video_url       VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== MEMBER_EXERCISES =====================
CREATE TABLE IF NOT EXISTS member_exercises (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    member_id       INT             NOT NULL,
    exercise_id     INT             NOT NULL,

    CONSTRAINT fk_me_member   FOREIGN KEY (member_id)   REFERENCES members(id)   ON DELETE CASCADE,
    CONSTRAINT fk_me_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id)  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== SCHEDULES =====================
CREATE TABLE IF NOT EXISTS schedules (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    member_id       INT             NOT NULL,
    exercise_name   VARCHAR(255)    NOT NULL,
    steps           INT             NOT NULL DEFAULT 0,
    rounds          INT             NOT NULL DEFAULT 0,
    image_url       VARCHAR(500),
    video_url       VARCHAR(500),

    CONSTRAINT fk_schedules_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== NUTRITION PLANS =====================
CREATE TABLE IF NOT EXISTS nutrition_plans (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    member_id       INT             NOT NULL,
    protein         FLOAT           NOT NULL DEFAULT 0,
    carbs           FLOAT           NOT NULL DEFAULT 0,
    fiber           FLOAT           NOT NULL DEFAULT 0,
    water_liters    FLOAT           NOT NULL DEFAULT 0,

    CONSTRAINT fk_nutrition_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== PAYMENTS =====================
CREATE TABLE IF NOT EXISTS payments (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    member_id       INT             NOT NULL,
    payment_date    DATE            NOT NULL,
    payment_month   VARCHAR(20)     NOT NULL COMMENT 'e.g. January 2026',
    status          VARCHAR(20)     NOT NULL DEFAULT 'PENDING' COMMENT 'PAID | PENDING',

    CONSTRAINT fk_payments_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== ATTENDANCE =====================
CREATE TABLE IF NOT EXISTS attendance (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    member_id       INT             NOT NULL,
    attend_date     DATE            NOT NULL,

    CONSTRAINT fk_attendance_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== PROGRESS =====================
CREATE TABLE IF NOT EXISTS progress (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    member_id       INT             NOT NULL,
    month           VARCHAR(20)     NOT NULL COMMENT 'e.g. January 2026',
    weight          FLOAT,
    chest           FLOAT,

    CONSTRAINT fk_progress_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================== NOTIFICATIONS =====================
CREATE TABLE IF NOT EXISTS notifications (
    id              INT             AUTO_INCREMENT PRIMARY KEY,
    member_id       INT             NOT NULL,
    message         VARCHAR(1000)   NOT NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    seen            BOOLEAN         NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_notifications_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
