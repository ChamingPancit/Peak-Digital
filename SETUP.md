# Full-Stack Portfolio Website - Setup Guide

Complete backend and frontend integration setup for Node.js + React/PostgreSQL portfolio.

## 📁 Project Structure

```
Batsup2026/
├── index.html           # Frontend homepage
├── styles.css           # Frontend styles
├── script.js            # Frontend JavaScript
├── SECURITY.md          # Security documentation
├── admin/
│   ├── admin.html       # Admin dashboard
│   ├── admin.css        # Dashboard styles
│   └── admin.js         # Dashboard JavaScript
└── backend/
    ├── package.json     # Dependencies
    ├── .env.example     # Environment template
    ├── server.js        # Main server file
    ├── config/
    │   ├── database.js  # PostgreSQL connection
    │   └── email.js     # Email service
    ├── routes/
    │   ├── contact.js   # Contact form API
    │   ├── auth.js      # Admin authentication
    │   └── admin.js     # Admin dashboard API
    ├── migrations/
    │   └── runMigrations.js  # Database setup
    └── README.md        # Backend documentation
```

## 🚀 Quick Start (5 minutes)

### Step 1: Install PostgreSQL

**Windows:**

- Download: https://www.postgresql.org/download/windows/
- Run installer, remember the password you set
- Add to PATH if prompted

**Mac:**

```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**

```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

```bash
# Open PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE portfolio_db;

# Verify
\l
```

### Step 3: Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
NODE_ENV=development
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=portfolio_db
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL_RECIPIENT=hello@developer.com
FRONTEND_URL=http://localhost:3000
```

### Step 4: Run Migrations

```bash
npm run migrate
```

This creates the database tables.

### Step 5: Start Backend

```bash
npm run dev
```

Should see:

```
🚀 Server running on http://localhost:5000
```

### Step 6: Update Frontend

In `script.js`, ensure:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

### Step 7: Open Website

Open `index.html` in browser and test the contact form!

## 📧 Email Setup

### Gmail (Recommended for Testing)

1. **Enable 2FA on Gmail:**
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow prompts

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy generated password

3. **Add to `.env`:**
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=generated-app-password
   ```

### SendGrid (Better for Production)

1. **Create Account:** https://sendgrid.com
2. **Get API Key:** Settings → API Keys → Create Key
3. **Add to `.env`:**
   ```
   SENDGRID_API_KEY=SG.xxxxx
   EMAIL_SERVICE=sendgrid
   ```

## 🔐 Admin Dashboard Setup

### Create Admin User

```bash
# Connect to database
psql -U postgres -d portfolio_db

# Create admin (use any secure password)
INSERT INTO admin_users (email, password_hash, first_name, last_name)
VALUES (
  'admin@example.com',
  '$2b$10$NXwG2yOaG.v3Pz6X.K9pK.2w2X4JjZqJj4JjZqJj4JjZqJj4Jj',
  'Admin',
  'User'
);
```

**To hash your own password:**

```javascript
// In Node.js REPL
const bcrypt = require("bcrypt");
const password = "your_password";
bcrypt.hash(password, 10).then((hash) => {
  console.log(hash); // Use this in INSERT query
});
```

### Access Dashboard

1. Open `admin/admin.html` in browser
2. Login with:
   - Email: `admin@example.com`
   - Password: `your_password`

## 🧪 Testing

### Test Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "test@example.com",
    "company": "Test Co",
    "budget": "10k-25k",
    "message": "This is a test message with more than 10 characters"
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Thank you for your message...",
  "submissionId": 1
}
```

### Test Admin Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_password"
  }'
```

### Test Dashboard Stats

```bash
# First, login to get token
TOKEN=your_jwt_token

curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

## 🚀 Deployment

### Option 1: Heroku (Easiest)

```bash
# Create Heroku account and install CLI
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-key
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=app-password

# Deploy
git push heroku main
```

### Option 2: AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli --upgrade --user

# Initialize
eb init -p "Node.js 18 running on 64bit Amazon Linux 2"

# Create environment with RDS
eb create --instance-type t3.micro --database

# Deploy
eb deploy
```

### Option 3: DigitalOcean

1. Create Droplet (Ubuntu 22.04)
2. SSH into droplet
3. Install Node.js and PostgreSQL
4. Clone repository
5. Setup .env and run migrations
6. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```
7. Setup Nginx as reverse proxy
8. Install SSL with Let's Encrypt

## 🔒 Production Checklist

Before deploying to production:

- [ ] Change all passwords and secrets
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS/SSL
- [ ] Setup proper CORS domain
- [ ] Configure firewall rules
- [ ] Enable database backups
- [ ] Setup monitoring and logging
- [ ] Test error handling
- [ ] Verify email sending
- [ ] Test admin dashboard
- [ ] Setup rate limiting
- [ ] Configure security headers

## 📊 API Reference

### Public Endpoints

**POST /api/contact** - Submit contact form

```json
{
  "name": "string",
  "email": "string",
  "company": "string (optional)",
  "budget": "5k-10k|10k-25k|25k-50k|50k+",
  "message": "string"
}
```

**GET /api/contact/stats** - Get submission stats

### Protected Endpoints (Requires JWT)

**POST /api/auth/login** - Admin login

```json
{
  "email": "string",
  "password": "string"
}
```

**GET /api/admin/messages** - Get all messages

- Query: `?page=1&limit=10&status=unread|read|replied|archived`

**GET /api/admin/messages/:id** - Get single message

**PUT /api/admin/messages/:id** - Update message

```json
{
  "status": "read|replied|archived",
  "notes": "string (optional)"
}
```

**DELETE /api/admin/messages/:id** - Delete message

**GET /api/admin/dashboard** - Dashboard stats

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Or use different port
PORT=3001 npm run dev
```

### Database connection error

```bash
# Test PostgreSQL connection
psql -U postgres -h localhost

# Check if PostgreSQL is running
pg_isready
```

### Emails not sending

- Verify Gmail app password is correct
- Check SMTP settings
- Look at console logs for errors
- Test with `npm run test-email`

### Admin login fails

- Ensure bcrypt password hash is correct
- Verify JWT_SECRET matches
- Check browser console for errors

### CORS errors

- Update `FRONTEND_URL` in `.env`
- Ensure frontend makes requests to correct API URL
- Check browser console for origin issues

## 📚 Additional Resources

- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [JWT Auth Guide](https://jwt.io/)
- [Nodemailer Setup](https://nodemailer.com/)

## 💡 Tips

1. **During Development:**
   - Use `npm run dev` to auto-reload on changes
   - Check browser console AND server logs
   - Use Postman to test API endpoints

2. **Before Going Live:**
   - Test all form validations
   - Test email sending
   - Test admin dashboard workflows
   - Check mobile responsiveness
   - Load test the application

3. **Security:**
   - Never commit `.env` file
   - Use strong passwords
   - Enable HTTPS
   - Setup firewalls
   - Regular backups

4. **Monitoring:**
   - Setup error tracking (Sentry)
   - Monitor database performance
   - Track email delivery
   - Watch server logs

---

**Need Help?**

- Check backend README.md
- Review SECURITY.md for security questions
- Check console logs for errors
- Test with curl/Postman before debugging frontend

**Last Updated**: January 28, 2026
