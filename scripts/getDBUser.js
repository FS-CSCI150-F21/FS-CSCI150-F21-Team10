import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'

var db = getFirestore(app);

//check if user is signed in. If yes, query in DB. If no, redirect back to sign in page.
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.uid, " ", user.displayName);
    lookupUser(uid);
    
} else {
  // User not signed in, redirect back to signin page
  console.log("Please Sign in")
  window.location = 'index.html'; 
}
});

async function lookupUser(uid){
  const docRef = doc(db, "User_database", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      document.getElementById('usernameID').innerHTML = 
      docSnap.data().userName;
      document.getElementById('emailID').innerHTML = 
      docSnap.data().email;
      document.getElementById('phoneID').innerHTML = 
      docSnap.data().phone;
  
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}