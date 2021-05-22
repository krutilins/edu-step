import { UserAnswer } from './user-answer-metadata.model';

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  userAnswers: UserAnswer[];
}
