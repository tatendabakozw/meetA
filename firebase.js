import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXz8qu8ntWmSVNlLIoRaqUz9Hs6SGuo9c",
    authDomain: "meeta-a7c56.firebaseapp.com",
    projectId: "meeta-a7c56",
    storageBucket: "meeta-a7c56.appspot.com",
    messagingSenderId: "666190980000",
    appId: "1:666190980000:web:9b0379ca679ffef5f2fac5",
    measurementId: "G-7LQJ9JPFWS"
};

let app

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export {db, auth}