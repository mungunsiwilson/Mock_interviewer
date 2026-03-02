import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>AI Virtual Interviewer</title>
        <meta name="description" content="Practice your interview skills with our AI-powered virtual interviewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          AI Virtual Interviewer
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Practice your interview skills with our AI-powered virtual interviewer featuring a 3D character. 
          Upload your CV and job description to get personalized interview questions.
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 max-w-2xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
            <div className="text-gray-500">3D Interviewer Preview</div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-bold text-lg mb-2">1. Upload Documents</div>
              <p className="text-gray-600">Upload your CV and job description</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-bold text-lg mb-2">2. Start Interview</div>
              <p className="text-gray-600">Interact with our AI interviewer</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 font-bold text-lg mb-2">3. Get Feedback</div>
              <p className="text-gray-600">Receive detailed performance feedback</p>
            </div>
          </div>
        </div>
        
        <Link href="/upload">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
            Start Mock Interview
          </button>
        </Link>
      </main>

      <footer className="mt-12 text-gray-600">
        © {new Date().getFullYear()} AI Virtual Interviewer. All rights reserved.
      </footer>
    </div>
  );
}