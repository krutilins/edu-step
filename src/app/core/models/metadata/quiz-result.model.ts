import { UserAnswer } from './user-answer-metadata.model';

export interface QuizReault {
  id: string;
  quizId: string;
  userId: string;
  userAnswer: UserAnswer[];
}
