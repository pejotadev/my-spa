# My SPA - Monorepo

A full-stack application with NestJS backend and React frontend, featuring user authentication and role-based access control.

## Features

- **Backend (NestJS + GraphQL + Prisma)**
  - JWT Authentication
  - Role-based authorization (Admin, Customer, Service Provider)
  - GraphQL API with Apollo Server
  - SQLite database with Prisma ORM
  - User management system

- **Frontend (React + TypeScript + Tailwind CSS)**
  - Modern React with TypeScript
  - Tailwind CSS for styling
  - Apollo Client for GraphQL
  - Protected routes and authentication
  - Admin dashboard for user management
  - Responsive design

## Project Structure

```
my-spa/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── prisma/         # Database service
│   │   └── main.ts         # Application entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript types
│   └── package.json
└── package.json           # Root package.json for monorepo
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project:
```bash
cd my-spa
```

2. Install dependencies for all packages:
```bash
npm run install:all
```

3. Set up the database:
```bash
cd backend
npx prisma generate
npx prisma db push
```

4. Create a default admin user (optional):
```bash
# You can create an admin user through the GraphQL playground
# or add one directly to the database
```

### Running the Application

1. Start both backend and frontend in development mode:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:4000
- GraphQL playground on http://localhost:4000/graphql
- Frontend on http://localhost:3000

2. Or run them separately:
```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

## Usage

### Authentication

1. Navigate to http://localhost:3000
2. You'll be redirected to the login page
3. Create an admin user first through the GraphQL playground or database
4. Login with your credentials

### Admin Features

- View all users
- Filter users by role (Customers, Service Providers)
- Create new users
- Manage user roles

### User Roles

- **Admin**: Full access to user management
- **Customer**: Basic user access
- **Service Provider**: Service provider access

## GraphQL API

The backend provides a GraphQL API with the following main operations:

### Queries
- `users`: Get all users (Admin only)
- `customers`: Get all customers (Admin only)
- `serviceProviders`: Get all service providers (Admin only)
- `me`: Get current user profile

### Mutations
- `login`: Authenticate user
- `createUser`: Create new user (Admin only)

## Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
```

## Technologies Used

### Backend
- NestJS
- GraphQL with Apollo Server
- Prisma ORM
- SQLite
- JWT Authentication
- Passport.js
- bcryptjs

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Apollo Client
- React Router
- React Hook Form
- Headless UI

## Development

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Create and run migrations
npx prisma migrate dev
```

### Building for Production

```bash
# Build both applications
npm run build

# Build backend only
npm run build:backend

# Build frontend only
npm run build:frontend
```

## License

This project is licensed under the MIT License.
