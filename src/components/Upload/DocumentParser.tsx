import { useState, useEffect } from 'react';

interface DocumentParserProps {
  file: File | null;
  onParseComplete: (content: string) => void;
  onError: (error: string) => void;
}

export default function DocumentParser({ file, onParseComplete, onError }: DocumentParserProps) {
  const [isParsing, setIsParsing] = useState(false);
  const [parsedContent, setParsedContent] = useState<string>('');

  useEffect(() => {
    if (!file) {
      setParsedContent('');
      return;
    }

    setIsParsing(true);
    parseDocument(file)
      .then(content => {
        setParsedContent(content);
        onParseComplete(content);
      })
      .catch(error => {
        console.error('Error parsing document:', error);
        onError(error.message || 'Failed to parse document');
      })
      .finally(() => {
        setIsParsing(false);
      });
  }, [file, onParseComplete, onError]);

  const parseDocument = async (file: File): Promise<string> => {
    // This is a mock implementation - in a real application, we would use libraries like:
    // - pdfjs-dist for PDF files
    // - mammoth for DOCX files
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (file.type === 'application/pdf') {
          resolve(`MOCK PDF CONTENT for ${file.name}\n\nThis is a simulation of parsed PDF content. In a real implementation, this would be the actual text extracted from the PDF document.\n\nKey sections would include:\n- Professional Summary\n- Work Experience\n- Education\n- Skills\n- Additional Information\n\nTotal words: ${Math.floor(Math.random() * 500) + 200}`);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          resolve(`MOCK DOCX CONTENT for ${file.name}\n\nThis is a simulation of parsed DOCX content. In a real implementation, this would be the actual text extracted from the Word document.\n\nKey sections would include:\n- Professional Summary\n- Work Experience\n- Education\n- Skills\n- Additional Information\n\nTotal words: ${Math.floor(Math.random() * 500) + 200}`);
        } else {
          throw new Error('Unsupported file type');
        }
      }, 1000); // Simulate network delay
    });
  };

  return (
    <div className="w-full">
      {isParsing && (
        <div className="flex items-center justify-center p-4 text-gray-600">
          <svg className="animate-spin h-5 w-5 mr-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Parsing document...
        </div>
      )}
      
      {!isParsing && parsedContent && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Parsed Content:</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto text-sm text-gray-600 border border-gray-200">
            {parsedContent}
          </div>
        </div>
      )}
    </div>
  );
}