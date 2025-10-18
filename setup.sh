#!/bin/bash

echo "🚀 Setting up My SPA Monorepo..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --legacy-peer-deps

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Push database schema
echo "🗄️ Setting up database..."
npx prisma db push

# Seed database with sample data
echo "🌱 Seeding database..."
npm run prisma:seed

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Setup complete!"
echo ""
echo "Both servers are now running:"
echo "  🖥️  Backend: http://localhost:4000/graphql"
echo "  🌐 Frontend: http://localhost:3000"
echo ""
echo "Default admin credentials:"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
echo "Sample user credentials:"
echo "  Customer: customer@example.com / customer123"
echo "  Service Provider: provider@example.com / provider123"
echo ""
echo "To restart the servers later:"
echo "  npm run dev"
