import { getFirestore, collection, query, doc, where, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'

var db = getFirestore(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    get_billDue(db, uid);

  } else {
    // User not signed in, redirect back to signin page
    console.log("Please Sign in")
    window.location = 'index.html';
  }
});

async function get_billDue(db, uid) {
  const docRef = doc(db, "User_database", uid);
  const docSnap = await getDoc(docRef);
  var hID = docSnap.data().houseID;

  // List for bill names
  const querySnapshot = await getDocs(collection(db, 'Household_database', hID, "Bills"));
  querySnapshot.forEach((doc) => {
    var node = document.createElement("LI");
    var bill = document.createTextNode(` ${doc.id}`);
    node.appendChild(bill);
    document.getElementById("billsID").appendChild(node);
  })
  // List for bill amounts
  querySnapshot.forEach((doc) => {
    var node = document.createElement("LI");
    var bill = document.createTextNode(`${doc.data().amount}`);
    node.appendChild(bill);
    document.getElementById("billAmountsID").appendChild(node);
  })
};



