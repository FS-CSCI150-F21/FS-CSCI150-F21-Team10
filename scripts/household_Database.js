import { getFirestore, collection, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from './initApp.js'

var db = getFirestore(app);

const varDoc = await collection(db, "Household_database");

document.getElementById('setBtn').addEventListener('click', (e) => {
    e.preventDefault();
    setColl(db);
})

async function set_hname(db){
    await setDoc(doc(varDoc, "79fBCYsnORWzu528pPAX")), {
        hname : document.getElementById('hNameID').value
    };
}


// function set_hsize(db){

// } test////


// function set_noroom(db){

// }


// function set_htype(db){

// }