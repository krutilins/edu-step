import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './models/app-state.model';
import { bookEditorReducer } from './reducers/book-editor.reducer';
import { libraryReducer } from './reducers/library.reducer';
import { questionReducer } from './reducers/question.reducer';
import { quizResultReducer } from './reducers/quiz-results.reducer';
import { quizReducer } from './reducers/quiz.reducer';
import { sidebarReducer } from './reducers/sidebar.reducer';
import { stepEditorReducer } from './reducers/step-editor.reducer';
import { stepTextReducer } from './reducers/step-text.reducer';
import { unitEditorReducer } from './reducers/unit-editor.reducer';
import { userReducer } from './reducers/user.reducer';

export const reducer: ActionReducerMap<AppState> = {
  user: userReducer,
  bookEditor: bookEditorReducer,
  sidebar: sidebarReducer,
  stepEditor: stepEditorReducer,
  unitEditor: unitEditorReducer,
  question: questionReducer,
  quiz: quizReducer,
  stepText: stepTextReducer,
  quizResult: quizResultReducer,
  library: libraryReducer
};
