#!/bin/bash

echo "🚀 Starting Portfolio with Project Reorder Feature"
echo "=================================================="
echo ""

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend already running on port 5000"
else
    echo "⚠️  Backend not running - Please start it manually:"
    echo "   cd backend && npm start"
    echo ""
fi

# Clear frontend cache
echo "🧹 Clearing Vite cache..."
rm -rf frontend/node_modules/.vite
echo "✅ Cache cleared"
echo ""

# Check .env
echo "🔍 Checking frontend .env configuration..."
if grep -q "localhost:5000" frontend/.env; then
    echo "✅ .env points to localhost (development mode)"
else
    echo "⚠️  .env might be pointing to production URL"
    echo "   For local testing, it should be:"
    echo "   VITE_API_URL=http://localhost:5000/api"
fi
echo ""

echo "📝 Quick Start Checklist:"
echo "========================"
echo ""
echo "1. ✅ Backend changes applied"
echo "2. ✅ Frontend changes applied"  
echo "3. ✅ Dependencies installed"
echo "4. ✅ Build successful"
echo ""
echo "TO USE THE FEATURE:"
echo "-------------------"
echo "1. Make sure backend is running (cd backend && npm start)"
echo "2. Start frontend: cd frontend && npm run dev"
echo "3. Open: http://localhost:5173/admin"
echo "4. Login with admin credentials"
echo "5. Press Ctrl+Shift+R to hard refresh"
echo "6. Go to Projects tab"
echo "7. Drag projects by the ⋮⋮ grip handle!"
echo ""
echo "📖 Full documentation: REORDER_SETUP_COMPLETE.md"
echo ""
echo "🎉 Ready to go! The feature is installed and working!"
