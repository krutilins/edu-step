// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCNjFUBL3ikn9gVYNHGcQxv1hFNJcsV_To',
    authDomain: 'knowledge-35752.firebaseapp.com',
    projectId: 'knowledge-35752',
    storageBucket: 'knowledge-35752.appspot.com',
    messagingSenderId: '225702212099',
    appId: '1:225702212099:web:ebe21bc13f1fce84e55436'
  },
  firebaseEndpoints: {
    books: 'books',
    units: 'units',
    steps: 'steps',
    text: 'texts',
    quiz: 'quizes',
    questions: 'questions',
    quizResults: 'quizResults',
    library: 'library',
    uploads: 'uploads'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
