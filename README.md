# Peak Digital - AI Automation & Web Development

A full-stack business website showcasing AI automation and web development services. Built with React + Vite (frontend) and Node.js + Express (backend), featuring an admin dashboard for managing client inquiries and service requests.

## Tech Stack

**Frontend:**

- React 18.3.1
- Vite 5.4.21
- React Router v6.22.0
- CSS3 (Flexbox, Grid, Animations)

**Backend:**

- Node.js + Express
- PostgreSQL
- JWT Authentication
- Bcrypt Password Hashing

**Design:**

- Dark Purple Theme (#0f0a1a) - Modern & Professional
- Magenta Accents (#d946ef) - Brand Highlight
- Fully Responsive (Mobile, Tablet, Desktop)
- AI-focused messaging and service positioning

## Project Structure

```
├── frontend/              # React + Vite app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── App.jsx
│   │   └── index.css     # Global styles
│   ├── package.json
│   └── vite.config.js
├── backend/              # Express.js API
│   ├── config/          # Database, Session config
│   ├── migrations/      # Database migrations
│   ├── routes/          # API routes
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 12+

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Batsup2026
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   npm run migrate
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`.

## Features

### Public Site

- **Hero Section:** Animated gradient showcasing AI + Web Dev solutions
- **About Section:** AI automation and web development expertise
- **Services Showcase:**
  - AI Automation Solutions
  - Custom Web Development
  - Backend & API Development
  - Machine Learning Integration
  - Cloud Deployment & DevOps
  - Security & Data Protection
- **Contact Form:** Service inquiry collection with budget range
- **Fully Responsive:** Mobile, tablet, and desktop optimization
- **Dark Theme:** Modern purple/magenta design

### Admin Dashboard

- Secure login with JWT authentication
- Client inquiry management (view, filter, mark as read)
- Service request tracking with statistics
- Real-time message dashboard
- Admin settings and team management

## Admin Credentials (Development)

- **Email:** admin@example.com
- **Password:** secure_admin_password

⚠️ **Change these in production!**

## Database

The application uses PostgreSQL to store client inquiries and manage admin users. Migrations are run automatically on startup.

**Tables:**

- `contact_messages` - Service inquiries and requests from clients
- `admin_users` - Admin user accounts for dashboard access

## Environment Variables

See `.env.example` for required variables:

- Database connection details
- JWT secret key
- Admin credentials
- Frontend URL (for CORS)

## Deployment

### Frontend

- **Vercel** (Recommended): Connect GitHub repo, auto-deploys on push
- **Netlify**: Similar to Vercel
- **Any Static Host**: Deploy `frontend/dist/` folder

### Backend

- **Railway.app**: Free tier with PostgreSQL included
- **Render.com**: Free tier available
- **DigitalOcean/AWS**: More advanced options

See [deployment guide](./SETUP.md) for detailed instructions.

## Security

- JWT tokens for authentication
- Bcrypt password hashing
- CORS configured
- Rate limiting on API routes
- SQL injection protection via parameterized queries

## License

MIT

## Author

**Peak Digital** - AI Automation & Web Development Services  
Built by Carl Virtusio

---

## Quick Links

- 🌐 **Live Site:** https://peak-digital.vercel.app
- 📧 **Contact:** Start your AI automation project today
- 💻 **Services:** Custom web dev, AI automation, and more
