# AIView - AI-Powered Mock Interview Platform

An intelligent interview preparation platform that uses AI to conduct mock interviews and provide feedback.

## Features

- AI-powered mock interviews
- Real-time feedback
- Firebase authentication
- Modern UI with Next.js and Tailwind CSS

## Tech Stack

- Next.js 15.3.2
- Firebase (Authentication & Firestore)
- Vapi AI
- TypeScript
- Tailwind CSS

## Setup

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
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
