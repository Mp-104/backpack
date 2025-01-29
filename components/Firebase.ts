import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const firebaseConfig = {

    apiKey: "AIzaSyCnWQS3GcWptAr6mjYEGoNoKOx9OugDyZw",
    authDomain: "test-63385.firebaseapp.com",
    //databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "test-63385",
    storageBucket: "test-63385.firebasestorage.app",
    messagingSenderId: "968009363062",
    appId: "1:968009363062:web:d8650c09b6ee60196ab957",
    measurementId: "G-02C59HY3SX",

};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app);

export {auth, db}




/* const app = initializeApp(firebaseConfig);

//const db = getFirestore(app);
const analytics = getAnalytics(app);

const auth = getAuth(app);

onAuthStateChanged( auth, user => {
    if (user != null ) {
        console.log("logged in");
    } else {
        console.log("no user");
    }
})

console.log("analytics: ")
console.log(analytics)
console.log("analytics end ") */

