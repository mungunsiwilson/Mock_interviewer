import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function UploadPage() {
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescContent, setJobDescContent] = useState<string>('');
  const [cvContent, setCvContent] = useState<string>('');
  const [isParsing, setIsParsing] = useState(false);
  const [errors, setErrors] = useState<{jobDesc?: string; cv?: string}>({});
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // Mock parsing function - would integrate with actual parser in real implementation
  const parseFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Mock content for ${file.name}. In a real implementation, this would be the parsed text from the document.`);
      }, 800);
    });
  };

  const handleFileChange = async (file: File | null, type: 'jobDesc' | 'cv') => {
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [type]: 'Invalid file type. Please upload PDF or DOCX files.'
      }));
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [type]: 'File too large. Maximum size is 10MB.'
      }));
      return;
    }

    // Clear previous errors
    setErrors(prev => ({ ...prev, [type]: undefined }));

    // Set file
    if (type === 'jobDesc') {
      setJobDescFile(file);
    } else {
      setCvFile(file);
    }

    // Parse file content
    setIsParsing(true);
    try {
      const content = await parseFile(file);
      if (type === 'jobDesc') {
        setJobDescContent(content);
      } else {
        setCvContent(content);
      }
    } catch (err) {
      console.error(`Error parsing ${type} file:`, err);
      setErrors(prev => ({
        ...prev,
        [type]: 'Failed to parse file. Please try again.'
      }));
    } finally {
      setIsParsing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'jobDesc' | 'cv') => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0], type);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (type: 'jobDesc' | 'cv') => {
    if (type === 'jobDesc') {
      setJobDescFile(null);
      setJobDescContent('');
      if (fileInputRef1.current) fileInputRef1.current.value = '';
    } else {
      setCvFile(null);
      setCvContent('');
      if (fileInputRef2.current) fileInputRef2.current.value = '';
    }
  };

  const isReadyToProceed = jobDescFile && cvFile && !isParsing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Upload Documents - AI Virtual Interviewer</title>
        <meta name="description" content="Upload your job description and CV for the mock interview" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Prepare for Your Interview</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your job description and CV so our AI interviewer can tailor questions specifically to the role and your background.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job Description Upload */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                jobDescFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-indigo-400'
              }`}
              onDrop={(e) => handleDrop(e, 'jobDesc')}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef1.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef1}
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0], 'jobDesc')}
              />
              
              {!jobDescFile ? (
                <>
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF or DOCX (Max 10MB)</p>
                </>
              ) : (
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-800">{jobDescFile.name}</p>
                  <p className="text-sm text-gray-500">{(jobDescFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>
            
            {errors.jobDesc && (
              <div className="mt-2 text-red-600 text-sm">{errors.jobDesc}</div>
            )}
            
            {jobDescContent && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Parsed Content:</h3>
                  <button 
                    onClick={() => removeFile('jobDesc')}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto text-sm text-gray-600">
                  {jobDescContent.substring(0, 300)}{jobDescContent.length > 300 ? '...' : ''}
                </div>
              </div>
            )}
          </div>

          {/* CV Upload */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your CV</h2>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                cvFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-indigo-400'
              }`}
              onDrop={(e) => handleDrop(e, 'cv')}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef2.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef2}
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0], 'cv')}
              />
              
              {!cvFile ? (
                <>
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF or DOCX (Max 10MB)</p>
                </>
              ) : (
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-800">{cvFile.name}</p>
                  <p className="text-sm text-gray-500">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>
            
            {errors.cv && (
              <div className="mt-2 text-red-600 text-sm">{errors.cv}</div>
            )}
            
            {cvContent && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Parsed Content:</h3>
                  <button 
                    onClick={() => removeFile('cv')}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto text-sm text-gray-600">
                  {cvContent.substring(0, 300)}{cvContent.length > 300 ? '...' : ''}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          {isParsing ? (
            <div className="py-3 px-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing your documents...
            </div>
          ) : isReadyToProceed ? (
            <Link href={{
              pathname: '/interview',
              query: { 
                jobDesc: encodeURIComponent(jobDescContent),
                cv: encodeURIComponent(cvContent)
              }
            }}>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                Begin Interview
              </button>
            </Link>
          ) : (
            <button 
              disabled={!isReadyToProceed}
              className={`${
                isReadyToProceed 
                  ? 'bg-indigo-600 hover:bg-indigo-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300`}
            >
              Begin Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}