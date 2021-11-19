import { getFirestore, collection, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from '../scripts/initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "Household_database");
var docName = "79fBCYsnORWzu528pPAX";

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    set_hname(db);
    set_hsize(db);
    set_noroom(db);
    set_htype(db);
})

async function set_hname(db){
    await setDoc(doc(varDoc, docName), { 
    hName : document.getElementById('houseName').value,
    },
    {merge: true});
}

async function set_hsize(db){
    await setDoc(doc(varDoc, docName), {
        hSize : parseInt(document.getElementById('numInHouse').value)
    },
    {merge: true});
}


async function set_noroom(db){
    await setDoc(doc(varDoc, docName), {
        noRoom : parseInt(document.getElementById('numBedrooms').value)
    },
    {merge: true});
}


async function set_htype(db){
    var houseOrApt = "error";
    if (document.getElementById('house').value){
        houseOrApt = "house";
    }
    else if (document.getElementById('apt').value){
        houseOrApt = "apartment";
    }
    else {}

    await setDoc(doc(varDoc, docName), {
        hType : houseOrApt
    },
    {merge: true});
}

/////////////////////////////////////////////////////////////////////////////
// async function get_hname(db){
//     const printThis = getDoc(doc(varDoc, "79fBCYsnORWzu528pPAX"));
//     console.log(printThis.data());
// }