import { getFirestore, collection, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from '../scripts/initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "User_database");
var docName = "79fBCYsnORWzu528pPAX";

//Questionare calling the setter functions
document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    var inUserName = document.getElementById('usernameInput').value;
    var inPhoneNumber = document.getElementById('phoneNumberInput').value;
    set_userName(db, docName, inUserName);
    set_phoneNumber(db, docName, inPhoneNumber);
})

//////////////////////////////////////////////////////////////////////////////////////////
async function set_userName(db, docInput, fieldInput){
    await setDoc(doc(varDoc, docInput), { 
    userName : fieldInput,
    },
    {merge: true});
}

async function set_phoneNumber(db, docInput2, fieldInput2){
    await setDoc(doc(varDoc, docInput2), { 
    phoneNumber : fieldInput2,
    },
    {merge: true});
}

// async function set_houseID(db){
//     await setDoc(doc(varDoc, docName), { 
//     hName : document.getElementById('phoneNumberInput').value,
//     },
//     {merge: true});
// }