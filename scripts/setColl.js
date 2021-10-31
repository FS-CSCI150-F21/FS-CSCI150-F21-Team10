import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);

//Eventlistener for set button. Prevents automatic field clear
document.getElementById('setBtn').addEventListener('click', (e) => {
    e.preventDefault();
    setColl(db);
})

//Create new house document 
async function setColl(db) {
    const newDoc = await addDoc(collection(db, "Household_database"), {
        hName: document.getElementById('hNameID').value,
        hSize: parseInt(document.getElementById('hSizeID').value),
        noRoom: parseInt(document.getElementById('noRoomID').value),
        hType: document.getElementById('hTypeID').value
    });
    console.log("Document ID: ", newDoc.id);
}




