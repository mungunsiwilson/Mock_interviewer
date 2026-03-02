# AI Virtual Interviewer

A web application for AI-powered virtual interviews with a 3D character. Users can upload their CV and job description, then participate in a realistic mock interview with an AI-powered 3D avatar.

## Features

- **Document Upload System**: Users can upload PDF/DOCX files (Job Description and CV)
- **Document Parsing**: Extract text from uploaded documents for context
- **3D Character Display**: Realistic 3D interviewer avatar on screen
- **AI-Powered Conversations**: Dynamic question generation based on job and CV
- **Speech Integration**: Text-to-speech for the interviewer and speech-to-text for the user
- **Interview Flow Management**: Structured interview with introduction, questions, and feedback
- **Responsive Design**: Works on desktop and tablet devices

## Tech Stack

- **Frontend**: React/Next.js with TypeScript
- **3D Rendering**: Three.js and React Three Fiber
- **AI/ML**: OpenAI API (GPT-4) for conversation
- **Document Processing**: PDF parsing library
- **Speech**: Web Speech API
- **Styling**: Tailwind CSS for UI

## Project Structure

```
src/
├── components/
│   ├── 3D/
│   │   ├── InterviewerModel.tsx      # 3D character component
│   │   ├── CharacterAnimations.tsx   # Animation controller
│   │   └── Scene.tsx                 # Three.js scene setup
│   ├── Upload/
│   │   ├── FileUpload.tsx            # Drag-drop file upload
│   │   ├── DocumentParser.tsx        # Extract text from PDF/DOCX
│   │   └── ContextViewer.tsx         # Show parsed content
│   ├── Interview/
│   │   ├── InterviewSession.tsx      # Main interview component
│   │   └── Timer.tsx                 # Interview timer
│   ├── AI/
│   │   └── InterviewAgent.ts         # GPT prompt engineering
│   └── UI/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── LoadingSpinner.tsx
├── pages/
│   ├── index.tsx                     # Landing page
│   ├── upload.tsx                    # Document upload page
│   ├── interview.tsx                 # Live interview page
│   └── feedback.tsx                  # Results page
├── styles/
│   └── globals.css
├── utils/
│   ├── documentParser.ts               # PDF/DOCX parsing utilities
│   └── apiClient.ts                    # OpenAI API wrapper
└── public/
    ├── models/                         # 3D character models
    └── sounds/                         # Audio files
```

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Visit `http://localhost:3000` in your browser.

## How to Use

1. Navigate to the home page and click "Start Mock Interview"
2. Upload your CV and the job description as PDF or DOCX files
3. Review the parsed content and click "Begin Interview"
4. Interact with the 3D interviewer using voice or text input
5. At the end of the interview, view your feedback and performance analysis

## Customization

- To modify the 3D character, update the `InterviewerModel.tsx` component
- To adjust AI behavior, modify the prompts in `InterviewAgent.ts`
- To change styling, update `globals.css` and Tailwind configurations

## Deployment

The application is built with Next.js and can be deployed to platforms like Vercel, Netlify, or any Node.js hosting service. For Vercel deployment:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Limitations & Future Enhancements

- Currently uses mock implementations for document parsing and AI interactions
- 3D character is a simple geometric model (can be replaced with GLTF models)
- Speech functionality is simulated (Web Speech API integration needed)
- Production implementation would require actual OpenAI API integration

## License

This project is licensed under the MIT License.