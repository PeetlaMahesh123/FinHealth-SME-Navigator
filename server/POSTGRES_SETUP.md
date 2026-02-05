# PostgreSQL setup instructions for FinHealth-SME-Navigator

## 1. Install PostgreSQL
- Download and install PostgreSQL from https://www.postgresql.org/download/
- During installation, set a strong password for the `postgres` user.

## 2. Create Database and User
1. Open the PostgreSQL shell (psql) or use a GUI like pgAdmin.
2. Run the following commands (replace `yourpassword` with a secure password):

```
CREATE DATABASE finhealth;
CREATE USER finuser WITH ENCRYPTED PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE finhealth TO finuser;
```

## 3. Update Environment Variables
- Edit `server/.env` with your credentials:

```
DATABASE_URL=postgresql://finuser:yourpassword@localhost:5432/finhealth
```

## 4. Database Schema
- Create tables for secure financial data storage. Example:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount NUMERIC(12,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Security Best Practices
- Use strong, unique passwords for DB users.
- Restrict DB access to only necessary hosts.
- Enable SSL for connections if possible.
- Regularly back up your database.
- Never commit `.env` files with credentials to version control.
