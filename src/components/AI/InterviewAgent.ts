export interface InterviewContext {
  jobDescription: string;
  cv: string;
}

export interface QuestionResponse {
  question: string;
  followUp?: string;
  feedback?: string;
}

class InterviewAgent {
  private context: InterviewContext;
  private conversationHistory: Array<{role: string, content: string}>;
  private questionHistory: string[];

  constructor(context: InterviewContext) {
    this.context = context;
    this.conversationHistory = [];
    this.questionHistory = [];
  }

  public async generateInitialQuestion(): Promise<QuestionResponse> {
    // In a real implementation, this would call the OpenAI API
    // For now, we'll return a mock question based on the context
    const possibleQuestions = [
      "Hello! Welcome to your mock interview. I'm your AI interviewer today. Let me start with a quick introduction. Could you please tell me about yourself and why you're interested in this position?",
      "Let's begin with a classic question. Can you walk me through your resume and highlight some key experiences that make you a good fit for this role?",
      "I'd like to start by understanding your background better. What attracted you to apply for this position?"
    ];
    
    const randomQuestion = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)];
    
    return {
      question: randomQuestion
    };
  }

  public async generateFollowUpQuestion(userResponse: string): Promise<QuestionResponse> {
    // In a real implementation, this would analyze the user's response
    // and generate a relevant follow-up question using the OpenAI API
    const possibleFollowUps = [
      "Thank you for that response. Now, could you tell me about a challenging project you've worked on and how you handled it?",
      "That's interesting. Can you give me a specific example of a time when you demonstrated leadership?",
      "I see you mentioned [specific skill/experience]. How did you develop that expertise?",
      "Can you describe a situation where you had to work under pressure or tight deadlines?",
      "Tell me about a time when you had to learn a new technology or skill quickly."
    ];
    
    const randomFollowUp = possibleFollowUps[Math.floor(Math.random() * possibleFollowUps.length)];
    
    return {
      question: randomFollowUp
    };
  }

  public async evaluateResponse(question: string, answer: string): Promise<number> {
    // In a real implementation, this would analyze the quality of the response
    // using the OpenAI API to score various aspects like relevance, structure, etc.
    // For now, we'll return a random score between 60-100
    return Math.floor(Math.random() * 41) + 60; // Random score between 60-100
  }

  public async generateFinalFeedback(): Promise<string> {
    // In a real implementation, this would analyze the entire interview
    // and generate comprehensive feedback using the OpenAI API
    const mockFeedback = `Overall, you demonstrated good knowledge in your field and showed enthusiasm for the role. Here are some highlights:
    
Strengths:
- You clearly articulated your experience with relevant examples
- You showed good problem-solving approach in technical questions
- You demonstrated strong communication skills

Areas for improvement:
- Consider providing more specific metrics to quantify achievements
- Work on structuring behavioral responses using STAR method
- Take a moment to pause and think before answering complex questions

Keep practicing to improve your interview skills!`;
    
    return mockFeedback;
  }

  public addToConversation(role: string, content: string): void {
    this.conversationHistory.push({ role, content });
  }

  public getConversationHistory(): Array<{role: string, content: string}> {
    return [...this.conversationHistory];
  }
}

export default InterviewAgent;