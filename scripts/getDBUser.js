import { getFirestore, collection, query, doc, where, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'

var db = getFirestore(app);

//check if user is signed in. If yes, query in DB. If no, redirect back to sign in page.
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    lookupUser(uid);
    
} else {
  // User not signed in, redirect back to signin page
  console.log("Please Sign in")
  window.location = 'index.html'; 
}
});

// lookup user in userDB with auth uid
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
      // query house name in houseDB with houseID
      var hID = docSnap.data().houseID;
      queryHname(db, hID );
     
  } else {
    console.log("user not found");
  }
}

async function queryHname(db, hID) { 
  const docRef = doc(db, "Household_database", hID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    document.getElementById('houseID').innerHTML = 
        docSnap.data().hName;
  } else {
    console.log("House not found");
  }
}