import { getFirestore, collection, doc, setDoc, getDoc, addDoc} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import {set_houseId} from '/scripts/user_Database.js'
import app from '../scripts/initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "Household_database");
const varDoc2 = collection(db, "user_database");

//Questionare calling the setter functions
document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();

    var inHname = document.getElementById('houseName').value;
    var inHsize = parseInt(document.getElementById('numInHouse').value);
    var inApt = parseInt(document.getElementById('house').value);
    var inNoRoom = parseInt(document.getElementById('numBedrooms').value);
    var inUserName = document.getElementById('usernameInput').value;
    //var inHouse = document.getElementById('apt').value;
    newHouse(inHname, inHsize, inApt, inNoRoom, inUserName); 
})

//creates a new document in household_database
async function newHouse(input1,input2,input3,input4,input5){
    const newHouseDoc = await addDoc(varDoc, {
        hName: input1,
        hSize: input2,
        hType: input3,
        noRoom: input4,
        rumiis: [input5],
    })
    .then(function(docRef) {
        // adds the houseID into the house doc itself, in case we need it
        setDoc(doc(varDoc, docRef.id), {
            houseID: docRef.id
        },
        {merge: true});
        setDoc(collection(db, "Household_database", docRef.id), {
            bills
        });
        // adds the houseID into the user doc, not done yet
        // setDoc(doc(varDoc2, getAuth()), {
        //     houseID: docRef.id
        // },
        // {merge: true});
    })
    .catch(function(error){
        console.error("error: ", error);
    });

}

/////////////////////////////////////////////////////////////////////////////
async function set_hname(dbInput, docInput, fieldInput){
    await setDoc(doc(dbInput, docInput), { 
    hName : fieldInput
    },
    {merge: true});
}

async function set_hsize(dbInput1, docInput1, fieldInput1){
    await setDoc(doc(dbInput1, docInput1), {
        hSize : fieldInput1
    },
    {merge: true});
}


async function set_noroom(dbInput2, docInput2, fieldInput2){
    await setDoc(doc(dbInput2, docInput2), {
        noRoom : fieldInput2
    },
    {merge: true});
}


async function set_htype(dbInput3, docInput3, boolApt, boolHouse){
    await setDoc(doc(dbInput3, docInput3), {
        hType : inApt
    },
    {merge: true});
}

/////////////////////////////////////////////////////////////////////////////
// async function get_hname(db){
//     const printThis = getDoc(doc(varDoc, "79fBCYsnORWzu528pPAX"));
//     console.log(printThis.data());
// }