# Portfolio Backend API

Full-stack backend for the developer portfolio website. Built with Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- PostgreSQL 12+
- Git

### Installation

1. **Clone and navigate to backend**

   ```bash
   cd backend
   npm install
   ```

2. **Setup environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Create PostgreSQL database**

   ```bash
   createdb portfolio_db
   ```

4. **Run migrations**

   ```bash
   npm run migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Server will run at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js       # PostgreSQL connection
│   └── email.js          # Email service configuration
├── routes/
│   ├── contact.js        # Contact form endpoints
│   ├── admin.js          # Admin dashboard endpoints
│   └── auth.js           # Authentication endpoints
├── migrations/
│   └── runMigrations.js  # Database schema setup
├── server.js             # Main application file
├── package.json          # Dependencies
├── .env.example          # Environment template
└── README.md
```

## 🔌 API Endpoints

### Contact Form (Public)

- **POST** `/api/contact` - Submit contact form

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "budget": "25k-50k",
    "message": "I'd like to discuss..."
  }
  ```

- **GET** `/api/contact/stats` - Get submission statistics

### Authentication

- **POST** `/api/auth/login` - Admin login

  ```json
  {
    "email": "admin@example.com",
    "password": "your_password"
  }
  ```

  Response: `{ "token": "jwt_token" }`

- **GET** `/api/auth/verify` - Verify JWT token

### Admin Dashboard (Protected - Requires JWT)

All endpoints require `Authorization: Bearer <token>` header

- **GET** `/api/admin/messages` - Get all messages (paginated)
  - Query params: `page=1&limit=10&status=unread`

- **GET** `/api/admin/messages/:id` - Get single message

- **PUT** `/api/admin/messages/:id` - Update message status

  ```json
  {
    "status": "replied",
    "notes": "Follow up needed"
  }
  ```

- **DELETE** `/api/admin/messages/:id` - Delete message

- **GET** `/api/admin/dashboard` - Dashboard statistics

## 📧 Email Configuration

### Option 1: Gmail (Recommended for testing)

1. Enable 2-Factor Authentication on your Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

### Option 2: SendGrid (Production)

1. Create SendGrid account: https://sendgrid.com
2. Get API key from settings
3. Add to `.env`:
   ```
   SENDGRID_API_KEY=your-api-key
   EMAIL_SERVICE=sendgrid
   ```

## 🔐 Security Features

- **Rate Limiting**: 5 submissions per IP per hour
- **Input Validation**: All inputs validated server-side
- **CORS**: Configured for your frontend domain
- **Helmet**: Security headers enabled
- **Compression**: Response compression enabled
- **JWT**: Secure token authentication for admin
- **Password Hashing**: bcrypt for admin passwords
- **SQL Injection Prevention**: Parameterized queries

## 🗄️ Database Schema

### contact_messages

```sql
- id: Primary key
- name: Sender name (max 100 chars)
- email: Sender email
- company: Company name (optional)
- budget: Budget range
- message: Contact message
- ip_address: Sender IP
- user_agent: Browser info
- status: unread/read/replied/archived
- notes: Admin notes
- created_at: Submission timestamp
- viewed_at: When admin viewed it
- updated_at: Last update timestamp
```

### admin_users

```sql
- id: Primary key
- email: Admin email (unique)
- password_hash: Bcrypt hashed password
- first_name: Admin name
- last_name: Admin surname
- is_active: Account status
- created_at: Account creation date
- updated_at: Last update date
- last_login: Last login timestamp
```

## 🔨 Development

### Available Scripts

```bash
npm start         # Start production server
npm run dev       # Start with auto-reload (nodemon)
npm run migrate   # Run database migrations
```

### Testing Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    "budget": "10k-25k",
    "message": "This is a test message"
  }'
```

### Testing Admin Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_password"
  }'
```

## 📊 Admin Dashboard Setup

To add an admin user to the database, connect directly to PostgreSQL:

```sql
INSERT INTO admin_users (email, password_hash, first_name, last_name)
VALUES (
  'admin@example.com',
  '$2b$10$your_bcrypt_hash_here',
  'Admin',
  'User'
);
```

Or use a script to hash the password:

```javascript
const bcrypt = require("bcrypt");
const password = "your_secure_password";
const hash = await bcrypt.hash(password, 10);
console.log(hash); // Use this hash in the INSERT query
```

## 🚀 Deployment

### Heroku

1. Create Heroku app: `heroku create app-name`
2. Add PostgreSQL: `heroku addons:create heroku-postgresql:hobby-dev`
3. Set environment variables: `heroku config:set JWT_SECRET=your_secret`
4. Deploy: `git push heroku main`

### AWS

1. Use RDS for PostgreSQL
2. Deploy Node.js app with Elastic Beanstalk
3. Configure security groups and environment variables

### DigitalOcean

1. Create Droplet with Node.js
2. Install PostgreSQL
3. Use PM2 for process management
4. Configure Nginx as reverse proxy
5. Set up SSL with Let's Encrypt

## 📝 Environment Variables Reference

```
NODE_ENV              # development or production
PORT                  # Server port (default: 5000)
DB_HOST              # PostgreSQL host
DB_PORT              # PostgreSQL port
DB_NAME              # Database name
DB_USER              # Database user
DB_PASSWORD          # Database password
EMAIL_SERVICE        # gmail or sendgrid
EMAIL_USER           # Email account username
EMAIL_PASSWORD       # Email account password / app password
SENDGRID_API_KEY     # SendGrid API key
ADMIN_EMAIL          # Default admin email
ADMIN_PASSWORD       # Default admin password
JWT_SECRET           # JWT signing secret
FRONTEND_URL         # Frontend domain for CORS
CONTACT_EMAIL_RECIPIENT  # Where to send contact emails
```

## 🐛 Troubleshooting

### Database connection fails

- Check PostgreSQL is running: `pg_isready`
- Verify .env credentials match your PostgreSQL setup
- Check port 5432 is not blocked

### Emails not sending

- Check EMAIL_FROM matches your email service
- Verify app passwords/API keys in .env
- Check CONTACT_EMAIL_RECIPIENT is valid
- Review email service logs

### JWT authentication fails

- Ensure JWT_SECRET matches between login and admin endpoints
- Check token is in Authorization header: `Authorization: Bearer <token>`
- Verify token hasn't expired (7 days)

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nodemailer Guide](https://nodemailer.com/about/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

## 📄 License

MIT - See LICENSE file for details

---

**Last Updated**: January 28, 2026
**Version**: 1.0.0
