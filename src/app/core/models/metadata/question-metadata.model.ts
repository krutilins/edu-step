export interface QuestionMetadata {
  id: string;
  quizId: string;
  question: string;
  answerType: string;
  options: {
    id: string,
    content: string
  }[];
  required: boolean;
}
