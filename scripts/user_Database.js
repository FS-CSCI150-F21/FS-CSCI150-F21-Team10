import { getFirestore, collection, doc, setDoc, getDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import app from '../scripts/initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "User_database");
const auth = getAuth();
const user = auth.currentUser;
//Questionare calling the setter functions
document.querySelectorAll("#joinHouse, #createHouse").forEach((ele) => {
    ele.addEventListener('click', (e) => {
    e.preventDefault();
    var inUserName = document.getElementById('usernameInput').value;
    var inPhoneNumber = document.getElementById('phoneNumberInput').value;

    newUser(inUserName, inPhoneNumber);
},{once : true})
});


async function newUser(userIn, phoneIn){
    const user = getAuth().currentUser;
    const newUserDoc = await setDoc(doc(varDoc, user.uid), {
        userName: userIn,
        phoneNumber: phoneIn,
        userID: user.uid,
        email: user.email
    });
}

//////////////////////////////////////////////////////////////////////////////////////////
async function set_userName(dbInput, docInput, fieldInput){
    await setDoc(doc(dbInput, docInput), { 
    userName : fieldInput,
    },
    {merge: true});
}

async function set_phoneNumber(dbInput1, docInput1, fieldInput1){
    await setDoc(doc(dbInput1, docInput1), { 
    phoneNumber : fieldInput1,
    },
    {merge: true});
}

export async function set_houseId(dbInput2, docInput2, fieldInput2){
    await setDoc(doc(dbInput2, docInput2), { 
    houseId : fieldInput2,
    },
    {merge: true});
}

// async function set_houseID(db){
//     await setDoc(doc(varDoc, docName), { 
//     hName : document.getElementById('phoneNumberInput').value,
//     },
//     {merge: true});
// }