import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);


const auth = getAuth();


document.getElementById('logout').addEventListener('click', LogoutUser)


function LogoutUser() {
  console.log('Logout Btn Call')
  signOut(auth).then(() => {
    window.location = 'index.html';
  }).catch((error) => {
    console.log(e)
  });
}


