@echo off
REM Quick setup script for Portfolio Backend on Windows

echo.
echo ====================================
echo Portfolio Backend - Quick Setup
echo ====================================
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: PostgreSQL not found in PATH
    echo Please ensure PostgreSQL is installed and added to PATH
    echo Download: https://www.postgresql.org/download/windows/
    echo.
)

echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Setting up environment...
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo CREATED: .env file
    echo.
    echo IMPORTANT: Edit .env with your PostgreSQL password and email settings
    echo Then run: npm run migrate
) else (
    echo .env already exists
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Edit .env file with your settings
echo 2. Create PostgreSQL database: createdb portfolio_db
echo 3. Run migrations: npm run migrate
echo 4. Start server: npm run dev
echo.
echo For detailed instructions, see SETUP.md
echo.
pause
