import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore,doc,getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
const auth = getAuth();

document.getElementById('login').addEventListener('click', GoogleLogin);

function GoogleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      //Google Access Token. use it to access Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      //display user info after successful login
      const user = result.user;
      redirect(user.uid);

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

// Redirect user after userDB check
async function redirect(uid) {
  const qResult = doc(db, "User_database",uid);
  const Snapshot = await getDoc(qResult);
<<<<<<< HEAD

=======
>>>>>>> fd188367f36fe36ef0162fa045aaa9d89b2ed263
    if(Snapshot.exists()){
      window.location = 'homepage.html';
    }
    else{
      window.location = 'questionnaire.html';;
    }
};


