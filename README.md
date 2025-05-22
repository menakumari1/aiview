# AIView - AI Mock Interview Platform

A sophisticated web application that leverages artificial intelligence to provide realistic mock interview simulations and instant feedback for job seekers.

## Project Overview

AIView is an innovative platform designed to help users practice and improve their interview skills. The platform uses AI to conduct mock interviews, providing a stress-free environment for practice and immediate constructive feedback.

## Key Features

### Interview Experience

- **AI-Powered Interviews**: Dynamic interview sessions with AI-generated questions
- **Voice Interaction**: Natural conversation with AI interviewer using voice recognition
- **Real-time Transcription**: Automatic conversion of speech to text during interviews
- **Custom Interview Types**: Choose from technical, behavioral, or mixed interview formats
- **Industry-Specific Questions**: Tailored questions based on job role and experience level

### Feedback & Analysis

- **Real-time Feedback**: Instant analysis of your responses and performance
- **Detailed Performance Metrics**: Scoring on communication, technical knowledge, and problem-solving
- **Response Quality Analysis**: Evaluation of answer structure, clarity, and relevance
- **Improvement Suggestions**: Personalized recommendations for better interview performance
- **Progress Tracking**: Monitor your improvement over multiple interview sessions

### User Experience

- **Intuitive Dashboard**: Easy-to-use interface for managing interview sessions
- **Customizable Profiles**: Set your preferences, skills, and target roles
- **Secure Authentication**: Protected access to your interview history and feedback
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Interview History**: Access past interview recordings and feedback

## Technology Stack

### Frontend

- **Framework**: Next.js 15.3.2 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: React Context API
- **UI Components**: Custom components with shadcn/ui

### Backend & Infrastructure

- **Authentication**: Firebase Auth for secure user management
- **Database**: Firebase Firestore for scalable data storage
- **AI Integration**: Vapi AI for voice interactions and natural language processing
- **Deployment**: Vercel for reliable hosting
- **API Layer**: Next.js API routes with TypeScript

## Local Development Setup

1. Clone the repository

```bash
git clone https://github.com/menakumari1/aiview.git
cd aiview
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env.local` file with the following variables:

```
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key

# Vapi AI Configuration
VAPI_AI_TOKEN=your-vapi-token

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
aiview/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication related pages
│   ├── (root)/            # Main application pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   └── shared/           # Shared components
├── firebase/             # Firebase configuration
│   ├── admin.ts         # Admin SDK setup
│   └── client.ts        # Client SDK setup
├── lib/                 # Utility functions
│   ├── actions/         # Server actions
│   └── utils/           # Helper functions
├── public/             # Static assets
└── types/             # TypeScript definitions
```

## Features in Development

### Interview Enhancement

- Advanced AI models for more natural conversations
- Support for multiple languages
- Video interview capabilities
- Custom question bank creation

### Analytics & Reporting

- Detailed performance analytics
- Progress tracking dashboards
- Interview session recordings
- Exportable performance reports

### Platform Improvements

- Mock interview scheduling system
- Peer review system
- Interview preparation resources
- Industry-specific interview modules
- Integration with job application platforms

### Technical Roadmap

- Enhanced error handling and logging
- Performance optimization
- Improved test coverage
- Mobile application development
- API documentation

## Future Enhancements

- Integration with more AI models for diverse interview styles
- Interview recording and playback features
- Enhanced analytics and performance metrics
- Industry-specific interview preparation modules
- Mock interview scheduling system
