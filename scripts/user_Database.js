import { getFirestore, collection, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from '../scripts/initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "User_database");
var docName = "79fBCYsnORWzu528pPAX";

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    set_userName(db);
    set_emailAddress(db);
    set_phoneNumber(db);
})

async function set_userName(db){
    await setDoc(doc(varDoc, docName), { 
    userName : document.getElementById('usernameInput').value,
    },
    {merge: true});
}

async function set_emailAddress(db){
    await setDoc(doc(varDoc, docName), { 
    emailAddress : document.getElementById('emailInput').value,
    },
    {merge: true});
}

async function set_phoneNumber(db){
    await setDoc(doc(varDoc, docName), { 
    phoneNumber : document.getElementById('phoneNumberInput').value,
    },
    {merge: true});
}

// async function set_houseID(db){
//     await setDoc(doc(varDoc, docName), { 
//     hName : document.getElementById('phoneNumberInput').value,
//     },
//     {merge: true});
// }