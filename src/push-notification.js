import firebase from 'firebase';


export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "794358277833"
  });
  navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });

}