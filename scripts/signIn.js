import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

document.getElementById('login').addEventListener('click', GoogleLogin)
//document.getElementById('logout').addEventListener('click', LogoutUser)

function GoogleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      //Google Access Token. use it to access Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      //display user info after successful login
      const user = result.user;
      console.log(result.user)
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

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location = 'questionnaire.html'; //After successful login, user will be redirected to home.html
  }
});

/*
function LogoutUser() {
  console.log('Logout Btn Call')
  signOut(auth).then(() => {
    document.getElementById('LoginScreen').style.display = "block"
    document.getElementById('dashboard').style.display = "none"
  }).catch((error) => {
    console.log(e)
  });
}
*/

