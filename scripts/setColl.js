import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);
console.log('app', db);
document.getElementById('setBtn').addEventListener('click', setColl(db));
async function setColl() {
    const docRef = await addDoc(collection(db, "tdb"), {
        rumiis: "3",
        rent: "4"
    });
    console.log("Document ID: ", docRef.id);
}






