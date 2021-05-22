export interface QuestionMetadata {
  id: string;
  quizId: string;
  question: string;
  answerType: string;
  options: string[];
  required: boolean;
}
