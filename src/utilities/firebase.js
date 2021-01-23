import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyDMjrRGIsoaKB9AjIIbnYeTyNTT9tPS-xA",
    authDomain: "vue-3-b1e79.firebaseapp.com",
    projectId: "vue-3-b1e79",
    storageBucket: "vue-3-b1e79.appspot.com",
    messagingSenderId: "465001908548",
    appId: "1:465001908548:web:20e380836e4eb71681af11"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.database()
        export const chatsRef = db.ref("chats")

export default firebase