# VisaVerse Assist 🌍

**Your AI-powered companion for visa guidance and immigration document preparation**

VisaVerse Assist is a production-ready web application that leverages Google's Gemini AI to help users understand visa requirements and prepare documentation for cross-border travel. Built with a modern tech stack, it provides intelligent, personalized guidance in simple, easy-to-understand language.

---

## ✨ Features

### 🎯 Visa Guidance Flow
- **Country Selection**: Choose your origin and destination countries
- **Purpose Identification**: Specify your travel purpose (study, work, travel, business)
- **AI-Powered Recommendations**: Get personalized visa type suggestions
- **Document Checklist**: Receive a comprehensive list of required documents
- **Step-by-Step Guide**: Follow clear, actionable application steps
- **Rejection Prevention**: Learn about common rejection reasons and how to avoid them

### 📄 Document Analysis
- **File Upload**: Drag-and-drop or browse to upload PDFs or images
- **Text Extraction**: Automatic text extraction from documents
- **AI Analysis**: Comprehensive document evaluation using Gemini Vision
- **Missing Information**: Identify gaps in your documentation
- **Clarity Assessment**: Get feedback on document presentation
- **Actionable Suggestions**: Receive specific recommendations for improvement

---

## 🛠️ Technology Stack

### Frontend
- **React 18+** - Modern component-based UI library
- **Next.js 14+** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Responsive Design** - Fully optimized for mobile and desktop devices

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **REST API** - Clean, scalable API architecture
- **Multer** - Middleware for handling file uploads

### AI & Intelligence
- **Google Gemini API** - Advanced language model for intelligent visa guidance
- **Gemini Vision** - Document and image analysis capabilities
- **Prompt Engineering** - Carefully crafted prompts for accurate, helpful responses
- **No Fine-Tuning** - Built entirely with prompt engineering (no custom training required)

---

## 📁 Project Structure

```
visaverse-assist/
├── backend/                    # Node.js + Express backend
│   ├── routes/                # API route handlers
│   │   ├── visa.js           # Visa guidance endpoint
│   │   ├── document.js       # Document analysis endpoint
│   │   └── health.js         # Health check endpoint
│   ├── services/             # Business logic layer
│   │   └── geminiService.js  # Gemini API integration
│   ├── utils/                # Utility functions
│   │   └── fileParser.js     # File processing utilities
│   ├── server.js             # Express app entry point
│   ├── package.json          # Backend dependencies
│   └── .env.example          # Environment variables template
│
├── frontend/                  # Next.js + React frontend
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.js          # Home page
│   │   ├── layout.js        # Root layout
│   │   ├── visa-assistant/  # Visa guidance page
│   │   ├── document-analyzer/ # Document analysis page
│   │   └── about/           # About page
│   ├── components/           # Reusable React components
│   │   ├── Navigation.js    # Navigation bar
│   │   ├── VisaForm.js      # Visa guidance form
│   │   └── DocumentUpload.js # Document upload component
│   ├── services/             # API integration
│   │   └── api.js           # Backend API calls
│   └── package.json          # Frontend dependencies
│
└── README.md                  # Project documentation
```

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=8000
   NODE_ENV=development
   ```

4. **Start the backend server**:
   ```bash
   npm run dev
   ```
   
   The backend will run at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file:
   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The frontend will run at `http://localhost:3000`

5. **Open your browser**:
   Visit `http://localhost:3000` to use the application

---

## 🎨 Usage Guide

### Getting Visa Guidance

1. Navigate to **Visa Assistant** page
2. Enter your **country of origin**
3. Enter your **destination country**
4. Select your **purpose of travel** (study, work, travel, business)
5. Click **Get Visa Guidance**
6. Review the AI-generated recommendations including:
   - Visa type
   - Required documents
   - Step-by-step checklist
   - Common rejection reasons

### Analyzing Documents

1. Navigate to **Document Analyzer** page
2. Upload a document (PDF, PNG, or JPEG, max 10MB):
   - Drag and drop into the upload area, OR
   - Click to browse and select a file
3. Click **Analyze Document**
4. Review the AI analysis including:
   - Document type assessment
   - Missing information
   - Clarity issues
   - Actionable suggestions

---

## 🤖 How We Use AI

### Gemini for Visa Guidance

We use Google's **Gemini 1.5 Flash** model to provide intelligent visa recommendations. The AI:

- Analyzes your origin country, destination, and travel purpose
- Generates structured responses with clear headings and bullet points
- Provides information in simple, accessible language
- Includes appropriate disclaimers about not being legal advice

**Example Prompt Structure**:
```
System: You are an AI visa assistant (NOT a legal authority).
Task: Provide visa guidance for [Origin] → [Destination] for [Purpose]
Format: Structured with headings, bullet points, and checklists
Disclaimer: Include that this is informational only, not legal advice
```

### Gemini Vision for Document Analysis

For document analysis, we leverage **Gemini's vision capabilities**:

- **PDF documents**: Text is extracted and analyzed
- **Images**: Gemini Vision processes the image directly
- Evaluates completeness, clarity, and quality
- Provides specific, actionable recommendations

---

## 📋 API Endpoints

### Backend API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check for server status |
| `/api/visa-guidance` | POST | Get AI-powered visa guidance |
| `/api/document-analyze` | POST | Analyze uploaded documents |

### Example API Requests

**Visa Guidance**:
```json
POST /api/visa-guidance
Content-Type: application/json

{
  "origin": "India",
  "destination": "USA",
  "purpose": "study"
}
```

**Document Analysis**:
```bash
POST /api/document-analyze
Content-Type: multipart/form-data

document: [PDF or image file]
```

---

## ⚠️ Important Disclaimer

**READ THIS CAREFULLY**

VisaVerse Assist is an **AI-powered assistance tool** and **educational resource**. It is **NOT**:

❌ **Legal advice** - Information is for general guidance only  
❌ **Official** - Not affiliated with any government agency  
❌ **Guaranteed to be accurate** - AI can make mistakes  
❌ **A replacement for professionals** - Consult licensed immigration attorneys for legal matters

✅ **Always verify** information with official embassy or consulate websites  
✅ **Use critical thinking** when reviewing AI suggestions  
✅ **Consult professionals** for important legal decisions  
✅ **Treat this as a starting point**, not the final authority

Your visa application success depends on accurate information and proper legal guidance.

---

## 🔒 Privacy & Security

- **No data storage**: Documents are analyzed and immediately deleted
- **No user tracking**: We don't store personal information
- **Secure transmission**: All API calls use standard security practices
- **Local processing**: Files are processed server-side and removed after analysis

---

## 🛣️ Future Enhancements

Potential features for future versions:

- [ ] Multi-language support
- [ ] User accounts and saved guidance history
- [ ] Real-time visa processing time estimates
- [ ] Integration with official embassy APIs
- [ ] Document templates and samples
- [ ] Email notifications for application deadlines
- [ ] Mobile app (iOS/Android)

---

## 🤝 Contributing

This is a production-ready project built as a demonstration. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is provided as-is for educational and demonstration purposes.

---

## 🙏 Acknowledgments

- **Google Gemini** - For providing the AI capabilities
- **Next.js & React** - For the excellent frontend framework
- **Express.js** - For the simple yet powerful backend framework
- **Tailwind CSS** - For the beautiful, responsive design system

---

## 📞 Support

For issues, questions, or feedback:
- Review the setup instructions carefully
- Check that all environment variables are set correctly
- Ensure your Gemini API key is valid and has available quota
- Verify both frontend and backend servers are running

---

**Built with ❤️ using Node.js, React, Next.js, and Google Gemini AI**
# VisaVerse
