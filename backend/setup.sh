#!/bin/bash
# Quick setup script for Portfolio Backend on Mac/Linux

echo ""
echo "===================================="
echo "Portfolio Backend - Quick Setup"
echo "===================================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "WARNING: PostgreSQL not found"
    echo "Please ensure PostgreSQL is installed"
    echo "Mac: brew install postgresql"
    echo "Linux: sudo apt-get install postgresql"
    echo ""
fi

echo "Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "Step 2: Setting up environment..."
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "CREATED: .env file"
    echo ""
    echo "IMPORTANT: Edit .env with your PostgreSQL password and email settings"
    echo "Then run: npm run migrate"
else
    echo ".env already exists"
fi

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Edit .env file with your settings"
echo "2. Create PostgreSQL database: createdb portfolio_db"
echo "3. Run migrations: npm run migrate"
echo "4. Start server: npm run dev"
echo ""
echo "For detailed instructions, see SETUP.md"
echo ""
