import { QuestionMetadata } from './question-metadata.model';

export interface UserAnswer {
  id: string;
  question: QuestionMetadata;
  answer: string[];
}
