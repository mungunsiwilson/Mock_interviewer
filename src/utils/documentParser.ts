/**
 * Utility functions for parsing different document types
 */

// Mock parsing functions - in a real implementation, we would use libraries like:
// - pdfjs-dist for PDF files
// - mammoth for DOCX files

export const parsePDF = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate parsing delay
    setTimeout(() => {
      resolve(`MOCK PDF CONTENT for ${file.name}\n\nThis is a simulation of parsed PDF content. In a real implementation, this would be the actual text extracted from the PDF document.\n\nKey sections would include:\n- Professional Summary\n- Work Experience\n- Education\n- Skills\n- Additional Information\n\nTotal words: ${Math.floor(Math.random() * 500) + 200}`);
    }, 1000);
  });
};

export const parseDOCX = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate parsing delay
    setTimeout(() => {
      resolve(`MOCK DOCX CONTENT for ${file.name}\n\nThis is a simulation of parsed DOCX content. In a real implementation, this would be the actual text extracted from the Word document.\n\nKey sections would include:\n- Professional Summary\n- Work Experience\n- Education\n- Skills\n- Additional Information\n\nTotal words: ${Math.floor(Math.random() * 500) + 200}`);
    }, 1000);
  });
};

export const parseDocument = async (file: File): Promise<string> => {
  if (file.type === 'application/pdf') {
    return await parsePDF(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await parseDOCX(file);
  } else {
    throw new Error('Unsupported file type. Only PDF and DOCX files are supported.');
  }
};

// Function to extract key information from parsed text
export const extractKeyInfo = (text: string) => {
  const info: {
    skills: string[];
    experience: string[];
    education: string[];
    summary: string;
  } = {
    skills: [],
    experience: [],
    education: [],
    summary: ''
  };

  // These are simple regex-based extractions - in a real implementation,
  // we would use more sophisticated NLP techniques
  const lowerText = text.toLowerCase();

  // Extract skills (simple keyword matching)
  const skillKeywords = [
    'javascript', 'python', 'react', 'node', 'sql', 'java', 'angular', 'vue',
    'html', 'css', 'mongodb', 'express', 'git', 'agile', 'scrum', 'leadership'
  ];
  info.skills = skillKeywords.filter(skill => lowerText.includes(skill));

  // Extract experience (simple pattern matching)
  const expPattern = /(\d+)\s*(year|years|month|months)\s+(experience|exp)/gi;
  let match;
  while ((match = expPattern.exec(text)) !== null) {
    info.experience.push(match[0]);
  }

  // Extract education (simple pattern matching)
  const eduPattern = /(bs|ba|ms|ma|phd|bachelor|master|degree|university|college)/gi;
  const eduMatches = new Set<string>();
  while ((match = eduPattern.exec(text)) !== null) {
    eduMatches.add(match[0]);
  }
  info.education = Array.from(eduMatches);

  // Extract summary (first paragraph after title)
  const paragraphs = text.split('\n\n');
  if (paragraphs.length > 1) {
    info.summary = paragraphs[0].substring(0, 200) + (paragraphs[0].length > 200 ? '...' : '');
  }

  return info;
};