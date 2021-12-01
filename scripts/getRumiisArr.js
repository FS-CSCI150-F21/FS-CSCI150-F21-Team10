
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import app from './initApp.js'

var db = getFirestore(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        getRumiis(uid);
    } else {
        window.location = 'index.html';
    }
});

async function getRumiis(uid) {
    // Get user's houseID
    const docRef = doc(db, "User_database", uid);
    const userDocSnap = await getDoc(docRef);

    // User's houseID used to query houses
    const houseRef = doc(db, "Household_database", userDocSnap.data().houseID);
    const houseDocSnap = await getDoc(houseRef);

    // List rumii array
    let list = document.getElementById("rumiisID");
    houseDocSnap.data().rumiis.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    })
}






