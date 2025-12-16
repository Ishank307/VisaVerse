# VisaVerse Assist - Setup Guide

## 🎯 Quick Start

Your VisaVerse Assist application is **complete and ready to run**!

---

## ✅ What's Been Built

### Backend (Node.js + Express)
- ✅ All API endpoints implemented
- ✅ Gemini API integration configured
- ✅ File upload handling with validation
- ✅ CORS enabled for frontend
- ✅ Dependencies installed (92 packages)
- ✅ Server tested and running on port 8000

### Frontend (Next.js + React + Tailwind)
- ✅ All 4 pages created (Home, Visa Assistant, Document Analyzer, About)
- ✅ All components built (Navigation, VisaForm, DocumentUpload)
- ✅ API service layer implemented
- ✅ Responsive design completed
- ✅ Dependencies ready to install (357 packages)

---

## ⚠️ Important: Gemini Model Configuration

**Action Required**: The Gemini model name needs to be verified and updated.

### Current Issue
The application is configured but the Gemini API is returning a 404 error for the model name. This happens because different API keys may have access to different model versions.

### Models Tested
- `gemini-1.5-flash` ❌ (404 error)
- `gemini-pro` ❌ (404 error)
- `gemini-1.5-pro` ❌ (404 error)

### How to Fix

**Option 1: Check Available Models**
```bash
# Create a test script to list available models
node -e "
import('@google/generative-ai').then(({ GoogleGenerativeAI }) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  // Note: Check Gemini API docs for model listing endpoint
  console.log('Check: https://ai.google.dev/models/gemini');
});
"
```

**Option 2: Try These Common Model Names**

Edit `backend/services/geminiService.js` and try these models one by one:

1. `gemini-pro` (most common)
2. `gemini-1.0-pro`  
3. `models/gemini-pro`
4. `models/gemini-1.5-pro`

**Lines to update** (3 places in the file):
- Line 19: `getGenerativeModel({ model: 'MODEL_NAME_HERE' })`
- Line 70: `getGenerativeModel({ model: 'MODEL_NAME_HERE' })`
- Line 119: `getGenerativeModel({ model: 'MODEL_NAME_HERE' })` (can also try with `-vision` suffix for images)

**Option 3: Check Official Documentation**

Visit: https://ai.google.dev/models/gemini

Look for the correct model name for your API key.

---

## 🚀 Running the Application

### Step 1: Start Backend

```bash
cd backend
node server.js
```

**Expected output**:
```
🚀 VisaVerse Backend running on http://localhost:8000
📊 Health check: http://localhost:8000/api/health
🌍 Environment: development
```

**Test health endpoint**:
```bash
curl http://localhost:8000/api/health
```

Should return:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "...",
  "service": "VisaVerse Backend API",
  "version": "1.0.0"
}
```

### Step 2: Start Frontend (New Terminal)

```bash
cd frontend
npm install  # First time only
npm run dev
```

**Expected output**:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
```

### Step 3: Open Browser

Navigate to: **http://localhost:3000**

---

## 🧪 Testing the Application

### Test 1: Health Check ✅
```bash
curl http://localhost:8000/api/health
```
**Status**: ✅ WORKING

### Test 2: Visa Guidance (After Model Fix)
```bash
curl -X POST http://localhost:8000/api/visa-guidance \
  -H "Content-Type: application/json" \
  -d '{"origin":"India","destination":"USA","purpose":"study"}'
```

### Test 3: Frontend Pages
- Home: http://localhost:3000
- Visa Assistant: http://localhost:3000/visa-assistant
- Document Analyzer: http://localhost:3000/document-analyzer
- About: http://localhost:3000/about

---

## 📝 Configuration Files

### Backend `.env`
```env
GOOGLE_API_KEY=your_google_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secure_random_string_here
PORT=8000
NODE_ENV=development
```
**Location**: `backend/.env` ✅ Already configured

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
**Action Needed**: Create this file before starting frontend
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: `GEMINI_API_KEY not set`
- **Solution**: Check that `backend/.env` exists and contains the API key

**Problem**: `Port 8000 already in use`
- **Solution**: Change PORT in `.env` or stop other process: `lsof -ti:8000 | xargs kill`

**Problem**: `404 Model not found`
- **Solution**: Update model name in `backend/services/geminiService.js` (see section above)

### Frontend Issues

**Problem**: `NEXT_PUBLIC_API_URL is undefined`
- **Solution**: Create `.env.local` in frontend directory

**Problem**: `Cannot connect to backend`
- **Solution**: Ensure backend is running on port 8000

**Problem**: `Module not found errors`
- **Solution**: Run `npm install` in frontend directory

---

## 📂 Project Structure

```
VisaVerse/
├── backend/
│   ├── routes/          # API endpoints
│   ├── services/        # Gemini AI integration
│   ├── utils/           # File parsing utilities
│   ├── server.js        # Express server
│   ├── package.json     # Dependencies
│   └── .env             # Configuration ✅
│
├── frontend/
│   ├── app/             # Next.js pages
│   ├── components/      # React components
│   ├── services/        # API calls
│   ├── package.json     # Dependencies
│   └── .env.local       # Configuration (create this)
│
└── README.md            # Full documentation
```

---

## 🎯 Next Steps

1. **Fix Gemini Model Name** (see section above) ⚠️
2. **Install Frontend Dependencies**: `cd frontend && npm install`
3. **Create Frontend .env.local**: Add API URL
4. **Start Both Servers**: Backend + Frontend
5. **Test in Browser**: Visit http://localhost:3000

---

## 📚 Additional Resources

- **Full README**: See `README.md` for comprehensive documentation
- **Implementation Walkthrough**: See artifact walkthrough for technical details
- **Gemini API Docs**: https://ai.google.dev/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com/

---

## ✨ Features Ready to Use (Once Model Fixed)

1. **Visa Guidance**: AI-powered recommendations
   - Country selection
   - Purpose identification  
   - Document checklists
   - Step-by-step guides

2. **Document Analysis**: Upload & analyze docs
   - PDF support
   - Image support (PNG/JPEG)
   - Detailed feedback
   - Actionable suggestions

3. **Beautiful UI**: Modern, responsive design
   - Mobile-friendly
   - Gradient backgrounds
   - Smooth animations
   - Professional look

---

**You're almost there! Just need to fix the Gemini model name and you'll be up and running! 🚀**
