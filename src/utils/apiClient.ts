/**
 * API Client for interacting with external services like OpenAI
 */

interface ApiConfig {
  apiKey: string;
  baseUrl?: string;
}

class ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  /**
   * Make a request to the OpenAI API
   */
  async openAIRequest(payload: {
    model: string;
    messages: Array<{role: string, content: string}>;
    temperature?: number;
    max_tokens?: number;
  }) {
    // In a real implementation, we would make an actual API call to OpenAI
    // For now, we'll return mock responses
    console.log('OpenAI Request:', payload);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response based on the request
    if (payload.messages[payload.messages.length - 1].content.includes('introduce')) {
      return {
        choices: [{
          message: {
            content: "Hello! Welcome to your mock interview. I'm your AI interviewer today. Let me start with a quick introduction. Could you please tell me about yourself and why you're interested in this position?"
          }
        }]
      };
    } else if (payload.messages[payload.messages.length - 1].content.includes('challenging project')) {
      return {
        choices: [{
          message: {
            content: "Thank you for that response. Now, could you tell me about a challenging project you've worked on and how you handled it?"
          }
        }]
      };
    } else {
      return {
        choices: [{
          message: {
            content: "Interesting. Can you elaborate on your experience with [specific technology/skill from context]?"
          }
        }]
      };
    }
  }

  /**
   * Send parsed document content for analysis
   */
  async analyzeDocuments(jobDescription: string, cv: string) {
    // In a real implementation, this would send the documents to an endpoint
    // for analysis using AI to extract key information and compare
    console.log('Analyzing documents...', { jobDescription, cv });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      matchingSkills: ['JavaScript', 'React', 'Node.js'],
      gaps: ['Python', 'Machine Learning'],
      experienceMatch: 85,
      recommendations: [
        'Highlight transferable skills',
        'Address technology gaps in cover letter'
      ]
    };
  }

  /**
   * Evaluate user response to interview question
   */
  async evaluateResponse(question: string, answer: string, context?: { jobDescription?: string, cv?: string }) {
    // In a real implementation, this would send the question and answer to an AI model
    // for evaluation based on relevance, completeness, and other factors
    console.log('Evaluating response...', { question, answer });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      score: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
      feedback: "Your response was well-structured and addressed the key points. Consider adding specific examples to strengthen your answer.",
      suggestions: [
        "Include specific metrics or outcomes",
        "Relate more directly to the job requirements"
      ]
    };
  }

  /**
   * Generate final feedback for the interview
   */
  async generateInterviewFeedback(conversationHistory: Array<{role: string, content: string}>) {
    // In a real implementation, this would analyze the entire conversation
    // and generate comprehensive feedback
    console.log('Generating feedback for conversation:', conversationHistory);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      overallScore: Math.floor(Math.random() * 21) + 75, // Random score between 75-95
      strengths: [
        "Clear communication of ideas",
        "Good examples of problem-solving",
        "Strong technical knowledge"
      ],
      improvementAreas: [
        "Structure behavioral responses with STAR method",
        "Provide more specific metrics",
        "Ask more thoughtful questions to the interviewer"
      ],
      recommendations: [
        "Practice more behavioral questions",
        "Research common questions for this role",
        "Prepare follow-up questions about the team and culture"
      ]
    };
  }
}

// Initialize the API client
let apiClient: ApiClient | null = null;

export const initializeApiClient = (apiKey: string) => {
  if (!apiClient) {
    apiClient = new ApiClient({
      apiKey,
      baseUrl: 'https://api.openai.com/v1'
    });
  }
  return apiClient;
};

export const getApiClient = () => {
  if (!apiClient) {
    throw new Error('API Client not initialized. Call initializeApiClient first.');
  }
  return apiClient;
};