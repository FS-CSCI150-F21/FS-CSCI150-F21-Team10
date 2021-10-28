import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

//Creates instance of rumii app to communicate with backend
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAxzPTkWTsGWOt8pXzyEZE9s0TG2zXLbg4",
  authDomain: "rumii-44bc9.firebaseapp.com",
  projectId: "rumii-44bc9",
  storageBucket: "rumii-44bc9.appspot.com",
  messagingSenderId: "464827417599",
  appId: "1:464827417599:web:cd89342122f5b9aa759dca",
  measurementId: "G-ZW8DSCG9PM"
});

const provider = new GoogleAuthProvider();
const auth = getAuth();

document.getElementById('login').addEventListener('click', GoogleLogin)
document.getElementById('logout').addEventListener('click', LogoutUser)

function GoogleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      //Google Access Token. use it to access Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      //display user info after successful login
      const user = result.user;
      console.log(result.user)
      document.getElementById('LoginScreen').style.display = "none"
      document.getElementById('dashboard').style.display = "block"
      showUserDetails(result.user)

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function showUserDetails(user) {
  document.getElementById('userDetails').innerHTML = `
    <img src="${user.photoURL}" style="width:10%">
    <p>Name: ${user.displayName}</p>
    <p>Email: ${user.email}</p>
    `
}

function LogoutUser() {
  console.log('Logout Btn Call')
  signOut(auth).then(() => {
    document.getElementById('LoginScreen').style.display = "block"
    document.getElementById('dashboard').style.display = "none"
  }).catch((error) => {
    console.log(e)
  });
}


