import { QuestionMetadata } from './question-metadata.model';

export interface UserAnswer {
  id: string;
  quesiton: QuestionMetadata;
  answer: string[];
}
