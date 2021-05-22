import { BookEditorState } from './book-editor-state.model';
import { QuestionState } from './question-state.model';
import { QuizState } from './quiz-state.model';
import { SidebarState } from './sidebar-state.model';
import { StepEditorState } from './step-editor.model';
import { StepTextState } from './step-text-state.model';
import { UnitEditorState } from './unit-editor-state.model';
import { UserState } from './user-state.model';

export interface AppState {
  user: UserState;
  bookEditor: BookEditorState;
  sidebar: SidebarState;
  stepEditor: StepEditorState;
  unitEditor: UnitEditorState;
  stepText: StepTextState;
  quiz: QuizState;
  question: QuestionState;
}
