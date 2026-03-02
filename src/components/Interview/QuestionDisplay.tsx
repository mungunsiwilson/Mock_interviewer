import React from 'react';

interface QuestionDisplayProps {
  question: string;
  isLoading?: boolean;
}

export default function QuestionDisplay({ question, isLoading }: QuestionDisplayProps) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Question</h2>
      <div className="bg-indigo-50 p-4 rounded-lg min-h-[80px] flex items-center">
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-pulse rounded-full h-3 w-3 bg-indigo-500 mr-2"></div>
            <div className="animate-pulse rounded-full h-3 w-3 bg-indigo-500 mr-2"></div>
            <div className="animate-pulse rounded-full h-3 w-3 bg-indigo-500"></div>
          </div>
        ) : (
          <p className="text-gray-700">{question || "Preparing next question..."}</p>
        )}
      </div>
    </div>
  );
}