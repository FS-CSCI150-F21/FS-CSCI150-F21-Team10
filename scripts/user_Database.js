import { getFirestore, collection, doc, setDoc, getDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from '../scripts/initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "User_database");

//Questionare calling the setter functions
document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    var inUserName = document.getElementById('usernameInput').value;
    var inPhoneNumber = document.getElementById('phoneNumberInput').value;

    newUser(inUserName, inPhoneNumber);
})

async function newUser(input1,input2){
    const newHouseDoc = await addDoc(varDoc, {
        userName: input1,
        phoneNumber: input2,
        //houseId: input3
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