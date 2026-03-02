import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
  label: string;
  fileType: 'jobDesc' | 'cv';
}

export default function FileUpload({ 
  onFileSelect, 
  acceptedTypes = ['.pdf', '.docx'], 
  maxSize = 10 * 1024 * 1024, // 10MB
  label,
  fileType
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      setError(`File too large. Maximum size is ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : file 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-indigo-400'
        } transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
        />

        {file ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-medium text-gray-800 truncate max-w-xs">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <button
              type="button"
              onClick={removeFile}
              className="mt-3 text-sm text-red-600 hover:text-red-800"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {acceptedTypes.join(', ').toUpperCase()} (MAX {(maxSize / 1024 / 1024).toFixed(0)}MB)
            </p>
          </div>
        )}

        {error && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-50 border-t border-red-200 p-2">
            <p className="text-xs text-red-600 text-center">{error}</p>
          </div>
        )}
      </div>

      <button
        type="button"
        className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
        onClick={onButtonClick}
      >
        Select a different file
      </button>
    </div>
  );
}