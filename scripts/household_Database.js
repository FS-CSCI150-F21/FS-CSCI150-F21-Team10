import { getFirestore, collection, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
import app from '../scripts/initApp.js'

var db = getFirestore(app);

const varDoc = collection(db, "Household_database");
var docName = "79fBCYsnORWzu528pPAX";

//Questionare calling the setter functions
document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    var inHname = document.getElementById('houseName').value;
    var inHsize = document.getElementById('numInHouse').value;
    var inNoRoom = document.getElementById('numBedrooms').value;
    //var inHname = document.getElementById('apt').value;
    set_hname(db, docName, inHname);
    set_hsize(db, docName, inHsize);
    set_noroom(db, docName, inNoRoom);
    set_htype(db, docName);
})

//////////////////////////////////////////////////////////////////////////////////////
async function set_hname(db, docInput, fieldInput){
    await setDoc(doc(varDoc, docInput), { 
    hName : fieldInput
    },
    {merge: true});
}

async function set_hsize(db, docInput1, fieldInput1){
    await setDoc(doc(varDoc, docInput1), {
        hSize : fieldInput1
    },
    {merge: true});
}


async function set_noroom(db, docInput2, fieldInput2){
    await setDoc(doc(varDoc, docInput2), {
        noRoom : fieldInput2
    },
    {merge: true});
}


async function set_htype(db, docInput3){
    var houseOrApt = "error";
    if (document.getElementById('house').value){
        houseOrApt = "house";
    }
    else if (document.getElementById('apt').value){
        houseOrApt = "apartment";
    }
    else {}

    await setDoc(doc(varDoc, docInput3), {
        hType : houseOrApt
    },
    {merge: true});
}

/////////////////////////////////////////////////////////////////////////////
// async function get_hname(db){
//     const printThis = getDoc(doc(varDoc, "79fBCYsnORWzu528pPAX"));
//     console.log(printThis.data());
// }