import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FeedbackPage() {
  const [overallScore, setOverallScore] = useState<number>(0);
  const [technicalScore, setTechnicalScore] = useState<number>(0);
  const [behavioralScore, setBehavioralScore] = useState<number>(0);
  const [communicationScore, setCommunicationScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate loading and calculating scores
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real implementation, these would come from the AI evaluation
      setOverallScore(Math.floor(Math.random() * 21) + 80); // 80-100
      setTechnicalScore(Math.floor(Math.random() * 21) + 75); // 75-95
      setBehavioralScore(Math.floor(Math.random() * 21) + 75); // 75-95
      setCommunicationScore(Math.floor(Math.random() * 21) + 80); // 80-100
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-lg text-gray-700">Analyzing your interview performance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Interview Feedback - AI Virtual Interviewer</title>
        <meta name="description" content="Your interview performance feedback" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Interview Feedback</h1>
          <p className="text-lg text-gray-600">
            Here's your performance analysis and recommendations for improvement
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Overall Performance</h2>
          <div className="flex justify-center items-center mb-4">
            <div className="text-6xl font-bold mr-4">
              <span className={getScoreColor(overallScore)}>{overallScore}%</span>
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold text-gray-700">{getScoreLabel(overallScore)}</div>
              <div className="text-gray-600">Out of 100%</div>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your responses to technical questions, behavioral scenarios, and communication skills during the interview.
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Skills</h3>
            <div className="flex items-end justify-center h-32 mb-4">
              <div 
                className={`w-16 ${getScoreColor(technicalScore)} font-bold`}
                style={{ height: `${technicalScore}px`, minHeight: '20px' }}
              >
                {technicalScore}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                <span className={getScoreColor(technicalScore)}>{technicalScore}%</span>
              </div>
              <div className="text-gray-600">{getScoreLabel(technicalScore)}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Behavioral Responses</h3>
            <div className="flex items-end justify-center h-32 mb-4">
              <div 
                className={`w-16 ${getScoreColor(behavioralScore)} font-bold`}
                style={{ height: `${behavioralScore}px`, minHeight: '20px' }}
              >
                {behavioralScore}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                <span className={getScoreColor(behavioralScore)}>{behavioralScore}%</span>
              </div>
              <div className="text-gray-600">{getScoreLabel(behavioralScore)}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication</h3>
            <div className="flex items-end justify-center h-32 mb-4">
              <div 
                className={`w-16 ${getScoreColor(communicationScore)} font-bold`}
                style={{ height: `${communicationScore}px`, minHeight: '20px' }}
              >
                {communicationScore}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                <span className={getScoreColor(communicationScore)}>{communicationScore}%</span>
              </div>
              <div className="text-gray-600">{getScoreLabel(communicationScore)}</div>
            </div>
          </div>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Key Strengths
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Clearly articulated your experience with relevant examples</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Demonstrated strong problem-solving approach in technical questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Showed good communication skills and confidence</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Effectively connected your background to the role requirements</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Areas for Improvement
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Consider providing more specific metrics to quantify achievements</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Work on structuring behavioral responses using STAR method</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Take a moment to pause and think before answering complex questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Prepare more thoughtful questions to ask the interviewer</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sample Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sample Questions You Were Asked</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-700">Question:</div>
              <p className="text-gray-800 mt-1">Tell me about yourself and why you're interested in this position.</p>
              <div className="mt-3 font-medium text-gray-700">Your Answer:</div>
              <p className="text-gray-800 mt-1">[Your response would appear here in the actual implementation]</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-700">Question:</div>
              <p className="text-gray-800 mt-1">Could you describe a challenging project you've worked on and how you handled it?</p>
              <div className="mt-3 font-medium text-gray-700">Your Answer:</div>
              <p className="text-gray-800 mt-1">[Your response would appear here in the actual implementation]</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">Next Steps</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Review the questions you struggled with and prepare better answers</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Practice more behavioral questions using the STAR method</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Research common questions for your specific role and industry</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Schedule another mock interview to practice improvement areas</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/interview">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Practice Again
            </button>
          </Link>
          <button className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-full text-lg border border-indigo-600 transition duration-300">
            Download Report
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-3 px-8 rounded-full text-lg border border-gray-300 transition duration-300">
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}