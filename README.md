# Dream Agency Backend API

Backend application built with Express.js, MongoDB, and Mongoose following MVC architecture.

## Project Structure

```
Back-end/
├── src/
│   ├── models/           # MongoDB Mongoose schemas
│   │   └── User.js
│   ├── controllers/      # Business logic & request handlers
│   │   └── userController.js
│   ├── routes/           # API endpoints
│   │   └── userRoutes.js
│   ├── middleware/       # Express middleware
│   │   └── errorHandler.js
│   ├── config/           # Configuration files
│   │   ├── database.js
│   │   └── constants.js
│   ├── utils/            # Helper & utility functions
│   └── app.js            # Express app configuration
├── public/               # Static files
├── logs/                 # Application logs
├── server.js             # Entry point
├── package.json          # Dependencies
├── .env                  # Environment variables
└── .gitignore
```

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Update `.env` with your configuration:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dream-agency
JWT_SECRET=your_jwt_secret_key_here
```

### Running the Server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

### API Endpoints

**Users:**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Architecture

- **Models**: Define data structure and database schema
- **Controllers**: Handle business logic and request/response
- **Routes**: Map API endpoints to controller methods
- **Middleware**: Handle cross-cutting concerns (errors, auth, etc.)
- **Config**: Centralized configuration management
- **Utils**: Reusable helper functions

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Security**: bcryptjs, jsonwebtoken
- **Utilities**: cors, dotenv

## Development

To add a new feature:

1. Create a model in `src/models/`
2. Create a controller in `src/controllers/`
3. Create routes in `src/routes/`
4. Import routes in `src/app.js`
